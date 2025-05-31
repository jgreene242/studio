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
    const {output} = await prompt(input);
    return output!;
  }
);
