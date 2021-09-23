const { Info_text } = require('../../../../models/models');

export default async function handler(req, res) {
  if (!req.user) return res.status(403).send("Not logged in");
  const info = await Info_text.findOne();
  const newInfo = info ? info : new Info_text();
  newInfo.text = req.body.text;
  await newInfo.save().catch(err => res.status(400).send(err.message));
  res.send("Info text saved");
}
