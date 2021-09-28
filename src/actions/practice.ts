import qs from "qs";
import { instance } from "../instance.js";
import { key } from "../config.js";

export default async function dailyPractice () {
  // 1. get info of id & items
  const form = qs.stringify({
    route: "train_list_get",
    key,
    diff: "0",
  });
  const items = await instance.post("/", form);

  // 2. construct a form
  const arrayOfStatus = items.data.re.question_bag.map((question) => [
    question.num,
    "1",
  ]);

  const dataForResult = qs.stringify({
    route: "train_finish",
    train_id: items.data.re.train_id,
    train_result: JSON.stringify(arrayOfStatus),
    key,
  });

  // 3. POST to server
  // 4. repeat 3 times
  console.log("Daily practice starts...");
  for (let i = 0; i < 3; i++) {
    await new Promise((resolve) => setTimeout(() => resolve(0), 1000));
    const result = await instance.post("/", dataForResult);
    console.log(`No.${i}`, result.data.tip);
  }
}
