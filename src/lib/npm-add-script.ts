const command = require('npm-add-script');

export interface AddScriptParameters {
  key: string;
  value: string;
  force: unknown;
}

export const npmAddScript = command as (params: AddScriptParameters) => void;
