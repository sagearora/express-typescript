type EnvTransformer = [string, (arg: any) => any];

const requiredEnvVars = {
    'PORT': ['port', (v: any) => +v],
} as {
    [id: string]: string|EnvTransformer
};


export type env = {
    port?: number
}

const environment: env = Object.keys(requiredEnvVars)
    .reduce((obj, envVar: string) => {
        if (!process.env[envVar]) {
            console.error(`Missing ${envVar} from config`)
            throw new Error(`${envVar} is required`);
        }
        const value = requiredEnvVars[envVar]
        if (typeof value === 'string') {
            return {
                ...obj,
                [value]: process.env[envVar]
            }
        }
        return {
            ...obj,
            [value[0]]: value[1](process.env[envVar]),
        }
    }, {} as env);

export default environment