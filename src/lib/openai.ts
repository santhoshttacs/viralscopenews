import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface RewrittenArticle {
    title: string;
    aiSummary: string;
    whyItMatters: string;
    keyTakeaways: string[];
    fullContent: string;
    wordCount: number;
}

export async function rewriteArticle(
    rawTitle: string,
    rawContent: string,
    category: string
): Promise<RewrittenArticle> {
    const prompt = `You are a professional news editor for a leading digital publication covering ${category}. 
Given the following raw news article, rewrite it into a completely original, professional article.

RAW TITLE: ${rawTitle}
RAW CONTENT: ${rawContent}

REQUIREMENTS:
1. Create a compelling, SEO-optimized headline (different from the original)
2. Write an AI Summary (2-3 concise sentences capturing the essence)
3. Write a "Why This Matters" section (2-3 sentences explaining significance and broader implications)
4. Create 3 bullet-point Key Takeaways
5. Write a full article body (minimum 300 words, aim for 350-400)
6. Content must be 100% original - no copied phrases
7. Use professional journalistic tone
8. Include relevant context and analysis

RESPOND IN EXACTLY THIS JSON FORMAT:
{
  "title": "Your rewritten headline here",
  "aiSummary": "Your 2-3 sentence summary here",
  "whyItMatters": "Your significance analysis here",
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
  "fullContent": "Your full article body here (300+ words, use \\n\\n for paragraphs)"
}`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: 'You are a professional news rewriter. Always respond with valid JSON only, no markdown formatting.',
            },
            { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    try {
        const parsed = JSON.parse(responseText);
        const wordCount = parsed.fullContent.split(/\s+/).length;

        return {
            title: parsed.title,
            aiSummary: parsed.aiSummary,
            whyItMatters: parsed.whyItMatters,
            keyTakeaways: parsed.keyTakeaways,
            fullContent: parsed.fullContent,
            wordCount,
        };
    } catch {
        throw new Error('Failed to parse AI response: ' + responseText.substring(0, 200));
    }
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 80)
        .replace(/^-|-$/g, '');
}
