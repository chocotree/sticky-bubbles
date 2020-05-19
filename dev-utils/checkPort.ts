import detect from 'detect-port';
import inquirer from 'inquirer';
import chalk from 'chalk';

const question = {
    type: 'confirm',
    name: 'shouldChangePort',
    message: chalk.yellow('The default port was occupied,\n' +
        'would you like to run the app on another port instead?'
    ),
    default: true,
};

const checkPort = (port = 3000) => new Promise<number>((resolve, reject) => detect(port)
    .then(freePort => {
        if (port == freePort) return resolve(port);

        inquirer.prompt([question]).then(ans => {
            if (ans.shouldChangePort) return resolve(freePort);

            return reject(new Error(chalk.red(`port: ${port} is occupied, please try another port instead.`)));
        })
    })
);

export { checkPort };