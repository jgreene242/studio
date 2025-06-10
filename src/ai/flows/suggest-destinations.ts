
// src/ai/flows/suggest-destinations.ts
'use server';
/**
 * @fileOverview An AI agent that suggests popular tourist destinations.
 *
 * - suggestDestinations - A function that suggests destinations.
 * - SuggestDestinationsInput - The input type for the suggestDestinations function.
 * - SuggestDestinationsOutput - The return type for the suggestDestinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDestinationsInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The current location of the user, e.g., a city name or address.'),
  recentSearches: z
    .string()
    .array()
    .optional()
    .describe('A list of the user\'s recent destination searches.'),
});
export type SuggestDestinationsInput = z.infer<typeof SuggestDestinationsInputSchema>;

const SuggestDestinationsOutputSchema = z.object({
  destinations: z
    .string()
    .array()
    .describe('A list of popular destination suggestions.'),
});
export type SuggestDestinationsOutput = z.infer<typeof SuggestDestinationsOutputSchema>;

export async function suggestDestinations(input: SuggestDestinationsInput): Promise<SuggestDestinationsOutput> {
  console.log(`[SuggestDestinations API] Received input: ${JSON.stringify(input)}`);

  // Explicit API key check
  if (!process.env.GEMINI_API_KEY) {
    const apiKeyErrorMsg = "[SuggestDestinations API] CRITICAL: GEMINI_API_KEY is not available in the server environment. AI features cannot function.";
    console.error(apiKeyErrorMsg);
    // This error will be caught by the client if the server action is called from a client component
    throw new Error("The AI-powered suggestion service is currently unavailable due to a configuration issue.");
  }

  try {
    const result = await suggestDestinationsFlow(input);
    console.log(`[SuggestDestinations API] Successfully returned output: ${JSON.stringify(result)}`);
    return result;
  } catch (flowError) {
    // This top-level catch is for errors from suggestDestinationsFlow if it throws.
    console.error(`[SuggestDestinations API] Error calling suggestDestinationsFlow:`, flowError);
    // Re-throw the error that suggestDestinationsFlow already prepared (or a new generic one if it wasn't an Error instance)
    if (flowError instanceof Error) {
      throw flowError; // flowError should be the "An error occurred..." error or a more specific one from the flow.
    }
    // Fallback generic error if what was thrown wasn't an Error instance
    throw new Error('An unexpected error occurred in the destination suggestion service.');
  }
}

const prompt = ai.definePrompt({
  name: 'suggestDestinationsPrompt',
  input: {schema: SuggestDestinationsInputSchema},
  output: {schema: SuggestDestinationsOutputSchema},
  prompt: `You are a travel assistant that suggests destinations to users based on their current location and recent searches.

Suggest a few destinations that are popular in the user's current location.

Location: {{{userLocation}}}

{{#if recentSearches}}
Recent Searches:
{{#each recentSearches}}
- {{{this}}}
{{/each}}
{{/if}}
`,
});

const suggestDestinationsFlow = ai.defineFlow(
  {
    name: 'suggestDestinationsFlow',
    inputSchema: SuggestDestinationsInputSchema,
    outputSchema: SuggestDestinationsOutputSchema,
  },
  async (input: SuggestDestinationsInput): Promise<SuggestDestinationsOutput> => {
    console.log(`[SuggestDestinationsFlow] Executing flow with input: ${JSON.stringify(input)}`);
    try {
      const {output} = await prompt(input); // This calls the prompt

      // Robust check for output and its structure
      if (!output) {
        console.error('[SuggestDestinationsFlow] AI model returned null or undefined output directly from prompt call.');
        throw new Error('AI model returned no parsable output. The response might be empty or malformed.');
      }
      
      if (!output.destinations || !Array.isArray(output.destinations)) {
          console.error(`[SuggestDestinationsFlow] AI model output is missing "destinations" array or it's not an array. Output received: ${JSON.stringify(output)}`);
          throw new Error('AI model response was not in the expected format (missing or invalid destinations array).');
      }
      
      console.log(`[SuggestDestinationsFlow] AI model returned output: ${JSON.stringify(output)}`);
      return output;
    } catch (error) {
      let clientErrorMessage = 'An error occurred while trying to suggest destinations. Please try again later.';
      if (error instanceof Error) {
        console.error(`[SuggestDestinationsFlow] Error during prompt execution. Name: ${error.name}, Message: ${error.message}, Stack: ${error.stack}`);
        // Check for common API key or permission issues if possible from error message
        const lowerErrorMessage = error.message.toLowerCase();
        if (lowerErrorMessage.includes('api key') || 
            lowerErrorMessage.includes('permission denied') || 
            lowerErrorMessage.includes('forbidden') ||
            lowerErrorMessage.includes('unauthenticated') ||
            lowerErrorMessage.includes('api_key_invalid') || // Added more specific check
            lowerErrorMessage.includes('could not find model')) { // Added model not found check
            clientErrorMessage = 'There seems to be an issue with the AI service configuration, authentication, or model availability. Please check server logs for details.';
            console.error("[SuggestDestinationsFlow] Potential API key, permission, or model issue detected based on error message.");
        }
      } else {
        // Log if the caught item is not an Error instance
        console.error('[SuggestDestinationsFlow] Unknown error type during prompt execution:', error);
      }
      // Throw a new error with a message intended for the client or higher-level server action handlers.
      // The detailed error is logged above for server-side debugging.
      throw new Error(clientErrorMessage);
    }
  }
);
