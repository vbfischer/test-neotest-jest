This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Purpose

Simple demonstration of using Jest in a Next.js project.

Specifically, a simple example that I'm trying to get to work using Neovim with the following:

- [LazyVim](https://www.lazyvim.org/) - Basic "distro" my Neovim configuration is based on.
- [Neotest](https://github.com/nvim-neotest/neotest) - Testing/NeoVim framework.
- [NeoTest-Jest](https://github.com/nvim-neotest/neotest-jest) - Neotest adapter for Jest testing framework.

When attempting to run Jest unit test (from the file `index.spec.tsx`), it is displaying a notification that "No Tests Found".

### Configuration

LazyVim comes with the following ["Extras" configuration](https://www.lazyvim.org/extras/test/core) to enable core testing ability

```lua
require("lazy").setup({
  spec = {
    { "LazyVim/LazyVim", import = "lazyvim.plugins" },
+    { import = "lazyvim.plugins.extras.test.core" },
    { import = "plugins" },
  },
})
```

Additional configuration done by adding `test.lua` file inside the `lua/plugins` folder with the following config:

```lua
return {
  {
    "haydenmeade/neotest-jest",
  },
  {
    "nvim-neotest/neotest",
    dependencies = { "haydenmeade/neotest-jest" },
    opts = function(_, opts)
      table.insert(
        opts.adapters,
        require("neotest-jest")({
          jestCommand = "npm test --",
          jestConfigFile = "jest.config.js",
          cwd = function()
            return vim.fn.getcwd()
          end,
        })
      )
    end,
  },
}
```

Putting cursor inside a unit test, and then executing `<leader>tr (Run Nearest)`.

## Troubleshooting

Things I have checked:

- Verified that neotest-jest is finding the `jest` entry in `project.json`'s entry `devDependencies`
- Verified that `padkage.json` constains a `script` entry:
  `"test": "jest --watch"`

- Verified that it runs successfully from the command line using `npm run test`
- Checked inside method `adapter.is_test_file` to see what the file path it was seeing. It is displaying a totally different file (`src/pages/api/hello.ts`) instead of the expected (`src/index.spec.tsx`)
