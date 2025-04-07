import BaseApi from "@api/_baseAPi";
import { store } from "@redux/store";

export default class GeminiApi extends BaseApi {
  constructor() {
    super();
  }

  async getResponse(userQuery: string): Promise<string | undefined> {

    const user = store.getState().user_store as any;

    try {
      const response = await GeminiApi.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          contents: [
            {
              parts: [{ text: userQuery }],
            },
          ],
          generationConfig: {
            topP: 0.88,
            temperature: 0.7,
            maxOutputTokens: 10000,
          },
          system_instruction: {
            parts: [
              {
                text: user?.userInfo?.user_info?.user_type === "customer" ? "You are an expert in IntelliWear’s company policies, including return policy, payment security, and delivery process. You will only answer user queries related to these policies based on the provided company guidelines. If you do not have relevant information, ask the user to check the official policy page. Do not answer unrelated questions. Additionally, you should suggest products based on the user's mentioned occasion (such as party, casual, office, or wedding) and recommend suitable colors based on the user's skin tone (fair, medium, or dark) that would complement them well." : "You are an expert in e-commerce product naming , description generation , size and price. You will assist the admin in creating compelling product names and detailed descriptions that highlight key features, materials, and benefits. Ensure that the descriptions are engaging, SEO-friendly, and aligned with current fashion trends. You will only respond to product-related queries and will not provide any other information. You will give information about products according to Pakistani market." ,
              },
            ],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
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
