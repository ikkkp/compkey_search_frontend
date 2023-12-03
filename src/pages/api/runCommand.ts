import { exec } from 'child_process';

export default async function handler(req :any, res:any) {
    const command = 'java -jar C:\\Users\\24964\\Desktop\\mavenproject1\\out\\artifacts\\mavenproject1_jar\\mavenproject1.jar '+ req.query.keyword;

    exec(command, { encoding: 'utf-8' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        console.log('Command output:', stdout);
        console.error('Command errors:', stderr);

        res.status(200).json({ output: stdout });
    });
}
