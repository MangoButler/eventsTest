import { buildPath, readData } from "../../helpers/api-util";
import fs from 'fs';



function handler(req, res){
    if(req.method === 'POST'){
        const mailAddress = req.body.email;
        const newEmail = {
            id: new Date().toISOString(),
            email: mailAddress
          };
        const filePath = buildPath('emails');
        const loadedEmails = readData(filePath);
        loadedEmails.push(newEmail);
        fs.writeFileSync(filePath, JSON.stringify(loadedEmails));
        res.status(200).json({message: 'success', body: newEmail});
    }
};

export default handler;