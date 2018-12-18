workflow "Build and deploy" {
  on = "push"
  resolves = ["Build", "Deploy"]
}

action "Install" {
  uses = "./.github"
  runs = "yarn"
}

action "Build" {
  uses = "./.github"
  needs = ["Install"]
  runs = "yarn build"
}

action "Deploy" {
  uses = "./.github"
  needs = ["Build"]
  runs = "yarn deploy"
  secrets = ["GITHUB_TOKEN"]
}