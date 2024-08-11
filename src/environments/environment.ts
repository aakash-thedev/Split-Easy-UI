interface Environment {
  production: boolean;
  staging: boolean;
  local: boolean;
  baseUrl: string;
  clientUrl: string;
}

const environmentLocal: Environment = {
  production: false,
  staging: false,
  local: true,
  baseUrl: "http://localhost:8080",
  clientUrl: "http://localhost:3000",
};

const environmentProduction: Environment = {
  production: true,
  staging: false,
  local: false,
  baseUrl: "",
  clientUrl: "",
};

const environment: Environment =
  process.env.REACT_APP_ENV === "local"
    ? environmentLocal
    : environmentProduction;

export default environment;
