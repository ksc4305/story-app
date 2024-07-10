// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let stories = {};

app.post('/api/stories/init', async (req, res) => {
  const { source } = req.body;
  const story_id = Date.now().toString(); // 임의의 story_id 생성

  // GPT-3 API 호출 부분 (주석 처리)
  /*
  const gptResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: source,
    max_tokens: 50,
    n: 1,
    stop: ["\n"]
  }, {
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    }
  });

  const first_sentence = gptResponse.data.choices[0].text.trim();
  */
  
  const first_sentence = "이것은 생성된 첫 문장입니다."; // Mock 데이터

  stories[story_id] = {
    story_id,
    sentences: [first_sentence],
    options: {}
  };

  res.json({ story_id, first_sentence });
});

app.get('/api/stories/:story_id/contents/:contents_index', (req, res) => {
  const { story_id, contents_index } = req.params;
  const story = stories[story_id];
  if (contents_index == 1) {
    res.json({ options: [story.sentences[0]] });
  } else {
    res.json({ options: story.options[contents_index - 2] });
  }
});

app.post('/api/stories/:story_id/contents/:contents_index', async (req, res) => {
  const { story_id, contents_index } = req.params;
  const { sentence } = req.body;
  stories[story_id].sentences.push(sentence);

  if (contents_index < 10) {
    // GPT-3 API 호출 부분 (주석 처리)
    /*
    const gptResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: stories[story_id].sentences.join(' ') + ' 다음 문장을 제안해주세요:',
      max_tokens: 50,
      n: 3,
      stop: ["\n"]
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      }
    });

    const options = gptResponse.data.choices.map(choice => choice.text.trim());
    */
    
    const options = [
      "이것은 두 번째 문장의 첫 번째 선택지입니다.",
      "이것은 두 번째 문장의 두 번째 선택지입니다.",
      "이것은 두 번째 문장의 세 번째 선택지입니다."
    ]; // Mock 데이터

    stories[story_id].options[contents_index] = options;
  }
  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
