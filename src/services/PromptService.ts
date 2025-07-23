export function buildStartupPromptWithAnswers(answers: string[], previousDescriptions: string[]): string {
    const titles = [
      'Interest Area',
      'Target Audience',
      'Value Proposition',
      'Commitment Level',
      'Solution Format',
      'Future Vision',
    ];
  
    const commandLines = answers.map((answer, idx) => `${titles[idx]}: ${answer}`);
  
    const previousNotes = previousDescriptions.length > 0
      ? `Do not generate ideas that are similar to the following descriptions:\n- ${previousDescriptions.join('\n- ')}\n`
      : '';
  
    return `
        You're an assistant that helps entrepreneurs come up with startup ideas.
        
        ${previousNotes}
        Using the user preferences below, generate a startup concept. Structure your output in the following exact format, with short but clear and understandable responses (avoid long paragraphs or overly technical details):
        
        Startup Title:  
        Description:
        
        Business Plan Summary:
        Market Analysis:
        Competitor Analysis:
        Revenue Model:
        Strengths:
        Weaknesses:
        Opportunities:
        Threats: 
        
        Keep the total length concise (approx 400 tokens). Use markdown-style line breaks (\\n) in your response to clearly separate each section.
        
        User Preferences:
        ${commandLines.join('\n')}
            `.trim();
}

export function buildStartupPromptWithIdeaNAnswers(idea: string, answers: string[]): string {
    const titles = [
      'Interest Area',
      'Target Audience',
      'Value Proposition',
      'Commitment Level',
      'Solution Format',
      'Future Vision',
    ];
  
    const commandLines = answers
      .map((answer, idx) => `${titles[idx]}: ${answer}`)
      .join('\n');
  
    return `
        You are a helpful assistant for startup founders.
        
        The user submitted this rough idea:
        "${idea}"
        
        User Preferences:
        ${commandLines}
        
        Your task:
        - First, determine whether the provided idea is consistent with the user preferences above.
        - If the idea and preferences do **not align**, respond with ONLY this message:
        "Description: ⚠️ The provided idea does not align with the user preferences."
        
        - If they do align, improve and structure the provided idea using the following format:
        
        Startup Title:  
        Description:
        
        Business Plan Summary:  
        Market Analysis:  
        Competitor Analysis:  
        Revenue Model:  
        Strengths:
        Weaknesses:
        Opportunities:
        Threats: 
        
        Use markdown-style line breaks (\\n) to separate each section. Keep the total length concise (around 400 tokens) and avoid overly technical language.
        `.trim();
}

export function buildDetailedIdeaPrompt(idea: string): string {
  return `
    You are a senior business consultant.

    Below is a structured startup idea:

    ${idea}

    Your task:
    - Retain the original **Startup Title** as-is.
    - For each of the other sections, rewrite with more detail, depth, and business insight.
    - Return the result in the exact same section structure and order shown below.

    Format your response in this exact structure:
    Startup Title:  
    [Keep original title]

    Description:  
    [Expanded description]

    Business Plan Summary:  
    [Expanded business plan]

    Market Analysis:  
    [Expanded market analysis]

    Competitor Analysis:  
    [Expanded competitor comparison]

    Revenue Model:  
    [Expanded revenue model]

    Strengths:  
    [List or paragraph of internal advantages]

    Weaknesses:  
    [List or paragraph of internal challenges or risks]

    Opportunities:  
    [List or paragraph of external growth opportunities]

    Threats:  
    [List or paragraph of external threats or risks]

    ⚠️ Guidelines:
    - Do not add new section titles or change the order.
    - Use markdown-style line breaks (\\n) between bullet points if needed.
    - Write with a business-professional tone, accessible to early-stage founders.
    - Keep responses clear and focused (approx 500 tokens total).
      `.trim();
    }

export function parseStructuredIdeaResponse(raw: string): Record<string, string> {
    const sections = raw.split(/\n(?=[A-Za-z ]+?:)/g);
    const result: Record<string, string> = {};
  
    for (const section of sections) {
      const [title, ...rest] = section.split(':');
      const key = title.trim();
      const value = rest.join(':').trim();
      if (key && value) {
        result[key] = value;
      }
    }
  
    return result;
}