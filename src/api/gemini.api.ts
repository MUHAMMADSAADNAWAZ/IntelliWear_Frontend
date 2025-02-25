import BaseApi from "@api/_baseAPi";

export default class GeminiApi extends BaseApi {
  constructor() {
    super();
  }

  async getResponse(userQuery: string): Promise<string | undefined> {
    try {
      const response = await GeminiApi.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          contents: [{ parts: [{ text: userQuery }] }],
          generationConfig: {
            topP: 0.88,
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response text
      const aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        throw new Error("Empty response from Gemini API");
      }

      return aiResponse;
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      return undefined;
    }
  }
}
