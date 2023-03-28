import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";

export class AiWoTorimodose {
  openai: OpenAIApi;

  constructor(key: string) {
    const configuration = new Configuration({
      apiKey: key,
    });
    this.openai = new OpenAIApi(configuration);
  }

  revise(message: string) {
    return this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "あなたはお問合せの文章を考えています。キーワードから文章を作成してくれます。",
        },
        {
          role: "user",
          content:
            "以下の条件から、お問合せの文章を考えてください。パソコンが動かなくなった、昨日までは動いた、今日の14時から動かなくなった、電源ボタンを長押ししても反応がない",
        },
        {
          role: "assistant",
          content:
            "いつもお世話になっております。私のパソコンが動かなくなってしまいました。昨日までは問題なく使用できておりましたが、今日の14時から突然動かなくなってしまいました。電源ボタンを長押ししても反応がない状態です。どうぞ、ご確認の程よろしくお願いいたします。",
        },
        {
          role: "user",
          content:
            "以下の条件から、お問合せの文章を考えてください。丁寧な言葉を使うように表現を修正してください。" +
            message,
        },
      ],
      temperature: 0.6,
      max_tokens: 500,
    });
  }
}
