
# 📘 API Code Generation Workflow

This document describes how we handle **OpenAPI-based API code generation** in our frontend project. It outlines the commands involved, the tools used, and the expected file structure.

---

## 🧰 Tools Used

| Tool | Description |
|------|-------------|
| `openapi-merge-cli` | Merges multiple Swagger (OpenAPI) specs into one file |
| `swagger-typescript-api` | Generates TypeScript API SDK based on Swagger |
| `@7nohe/openapi-react-query-codegen` | Generates strongly typed React Query hooks based on Swagger |

---

## 📁 Input & Output Paths

- **Swagger Config Input:**  
  The backend API Swagger URL is configured in `./apps/fe-app/swagger/swagger.config.json`.  
  **⚠️ Make sure to update this if the backend URL or path changes.**

- **Merged Swagger Output:**  
  `./apps/fe-app/swagger/swagger.output.json`

- **Generated SDK Output:**  
  `./apps/fe-app/models/axios.ts`

- **React Query Hooks Output:**  
  `./libs/openapi/src/queries/{queries.ts, index.ts}`

---

## 📜 Available Scripts

### 1. 🔄 `npm run merge:swagger`

```json
"merge:swagger": "npx openapi-merge-cli --config ./apps/fe-app/swagger/swagger.config.json"
```

- Merges multiple Swagger files (or a single file) into one output:  
  `swagger.output.json`.

---

### 2. 🧬 `npm run generate:sdk`

```json
"generate:sdk": "npx swagger-typescript-api -p ./apps/fe-app/swagger/swagger.output.json -o ./apps/fe-app/models -n axios.ts"
```

- Uses the merged Swagger file to generate a fully typed **API client SDK** using Axios.

---

### 3. 🧹⚙️ `npm run generate:query`

```json
"generate:query": "rm -f ./libs/openapi/src/queries/queries.ts ./libs/openapi/src/queries/index.ts && npx --package @7nohe/openapi-react-query-codegen openapi-rq -i ./apps/fe-app/swagger/swagger.output.json -o ./libs/openapi/src/queries -c fetch"
```

- Deletes previously generated React Query files to ensure a clean output.
- Generates **typed React Query hooks** based on the Swagger spec.
- Output is saved under `./libs/openapi/src/`.

> ℹ️ If you're on Windows, use [`shx`](https://www.npmjs.com/package/shx) or [`rimraf`](https://www.npmjs.com/package/rimraf) to ensure cross-platform compatibility.

---

### 4. ⚡ `npm run output:swagger`

```json
"output:swagger": "npm run merge:swagger && npm run generate:sdk"
```

- Combines both merging and SDK generation in one step.
- Useful when you only need the typed SDK and not React Query hooks.

---

## 🧭 Recommended Workflow

When backend Swagger files are updated, follow this sequence:

1. **Update the backend URL** in `swagger.config.json` if necessary.
2. Run `npm run output:swagger` to generate the updated TypeScript SDK.
3. Run `npm run generate:query` to generate fresh React Query hooks.

---

## 💡 Tips

- Always ensure the backend Swagger URL is **up-to-date** in `swagger.config.json`.
- If you run into issues with old generated files, delete the output directory manually or rely on the clean-up script included in `generate:query`.
