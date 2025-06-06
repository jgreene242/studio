
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
  return suggestDestinationsFlow(input);
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
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        console.error('SuggestDestinationsFlow: The AI model did not return a valid output.');
        // Consider what to return or how to signal this specific error.
        // For now, we'll let Zod validation on the output schema catch this if it's truly empty/invalid,
        // or throw a more specific error if a completely null/undefined output is not expected.
        // If the schema expects an array and gets undefined, Zod should catch it.
        // If the model genuinely returns an empty list due to prompt, that's valid.
        // This check is more for an unexpected null/undefined from the Genkit `prompt` call itself.
        throw new Error('AI model returned no output.');
      }
      return output; // Zod schema validation on output will still apply
    } catch (error) {
      console.error('Error executing suggestDestinationsFlow:', error);
      // Re-throw a more generic error or allow specific errors to propagate if handled upstream.
      // This helps ensure the error is at least logged server-side.
      throw new Error('An error occurred while trying to suggest destinations. Please try again later.');
    }
  }
);

