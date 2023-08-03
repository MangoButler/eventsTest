import {
  connectDataBase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    //add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      !text ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(421).json({ status: 421, message: "Invalid Input" });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      console.log(result);
      res
        .status(201)
        .json({ status: 201, message: "Added new comment", comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "Inserting comment failed!" });
    }
  }
  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 }, {eventId: eventId});
      res.status(201).json({ comments: documents });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "Could not fetch comments" });
    }
  }

  client.close();
}

export default handler;

//try to name folders so the api route makes sense
