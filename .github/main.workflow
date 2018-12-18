workflow "Build and deploy" {
  on = "push"
  resolves = ["Build"]
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
