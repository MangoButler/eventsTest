import { buildPath, readData } from "../../../helpers/api-util";
import fs from "fs";

function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.query.eventId;
    const commentData = req.body;
    const newComment = {
      ...commentData,
      eventId: eventId,
      commentId: new Date().toISOString(),
    };

    const filePath = buildPath("comments");
    const allComments = readData(filePath);
    allComments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(allComments));
    res
      .status(201)
      .json({
        message: "Sucessfully created comment",
        body: allComments.filter(comment => comment.eventId === eventId),
      });
  } else {
    const eventId = req.query.eventId;
    const filePath = buildPath("comments");
    const allComments = readData(filePath);
    res
      .status(201)
      .json({
        message: "Sucessfully fetched Comments",
        body: allComments.filter(comment => comment.eventId === eventId),
      });
  }
}

export default handler;
