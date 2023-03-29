import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export class AiWoTorimodose {
  openai: OpenAIApi;

  constructor(key: string) {
    const configuration = new Configuration({
      apiKey: key,
    });
    this.openai = new OpenAIApi(configuration);
  }

  revise(type: "customer" | "support", message: string) {
    let messages: ChatCompletionRequestMessage[] = [];

    if (type === "customer") {
      messages = this.customerMessages(message);
    }

    if (type === "support") {
      messages = this.supportMessages(message);
    }

    return this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.6,
      max_tokens: 500,
    });
  }

  private customerMessages(message: string): ChatCompletionRequestMessage[] {
    return [
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
    ];
  }


  private supportMessages(message: string): ChatCompletionRequestMessage[] {
    return [
      {
        role: "system",
        content:
        "あなたはカスタマーサポートの担当者です。キーワードを用いて、お問い合わせに回答してください。",
      },
      {
        role: "user",
        content:
        "電源ケーブルが接続されていることを確認してください。パソコンの電源を入れ、パソコンの電源ランプが点灯するかどうかを確認してください。画面に何か表示されるか確認してください。",
      },
      {
        role: "assistant",
        content:
        "お問い合わせありがとうございます。はじめに電源ケーブルが接続されていることを確認してください。次にパソコンの電源を入れ、パソコンの電源ランプが点灯するかどうかを確認してください。電源ランプが点灯したら、画面に何か表示されるか確認してください。",
      },
      {
        role: "user",
        content:
        "以下の条件から、回答の文章を考えてください。丁寧な言葉を使うように表現を修正してください。" +
        message,
      },
    ];
  }
}
