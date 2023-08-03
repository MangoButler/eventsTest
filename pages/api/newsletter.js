import { connectDataBase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      //never rely on frontend validation alone, always also validate on the api route bcs this cannot be manipulated by hte user
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    let result;
    try {
      client = await connectDataBase();
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Connecting to data base failed! Wait a moment and try again!",
      });
      return;
    }

    try {
      result = await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Could not save comment. Try again in a few moments.",
      });
      return;
    }

    res.status(201).json({ status: 201, message: "Success", body: result });
  }
}

export default handler;

// import { buildPath, readData } from "../../helpers/api-util";
// import fs from "fs";

// function handler(req, res){
//     if(req.method === 'POST'){
//         const mailAddress = req.body.email;
//         const newEmail = {
//             id: new Date().toISOString(),
//             email: mailAddress
//           };
//         const filePath = buildPath('emails');
//         const loadedEmails = readData(filePath);
//         loadedEmails.push(newEmail);
//         fs.writeFileSync(filePath, JSON.stringify(loadedEmails));
//         res.status(200).json({message: 'success', body: newEmail});
//     }
// };

// export default handler;
