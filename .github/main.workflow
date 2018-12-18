workflow "Build and deploy" {
  on = "push"
  resolves = ["docker://node:10-alpine"]
}

action "Install" {
  uses = "docker://node:10-alpine"
  runs = "yarn"
}

action "Build" {
  uses = "docker://node:10-alpine"
  needs = ["Install"]
  runs = "yarn build"
}

action "docker://node:10-alpine" {
  uses = "docker://node:10-alpine"
  needs = ["Build"]
  runs = "yarn deploy"
  secrets = ["GITHUB_TOKEN"]
}