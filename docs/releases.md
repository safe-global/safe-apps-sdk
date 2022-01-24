# Release process

### High-level overview

The repository is managed using [changesets](https://github.com/atlassian/changesets) workflow. It automates package versioning, changelogs. Changesets has a focus on solving these problems for multi-package repositories and keeps packages that rely on each other within the multi-package repository up-to-date, as well as making it easy to make changes to groups of packages.

- Newly added changes are merged to the `development` branch first with a changeset
- Before making a change, a pre-release mode should be made (We'll cover it later). The pre-release mode should be used only on the `development` branch
- `changesets` GitHub action takes care of versioning and github releases
- When the `development` branch is ready for production release, a PR should be made to disable the pre-release mode. The PR will be covered by example steps below
- Once everything is set for the release, someone with publishing rights has to execute `npx changeset publish --otp=["token"]`, this will publish packages to npm and create tags. Tags **need** to be pushed to the repository
- Once released, Go to `Actions` tab on Github and run `Version Packages/Github Releases` action manually from the production branch

### Example workflow

- On a working branch, enter the pre-release mode

```
yarn changeset pre enter next
```

It enables [pre-release](https://github.com/atlassian/changesets/blob/main/docs/prereleases.md) mode. Once merged to the `development` branch, `changesets` GitHub action will tweak package versions to include the `next` suffix and release it to npm

- Add a changeset explaining the changes. It's easy, just follow-up changesets' instructions

```
npx changeset

yarn changeset
```

- To release packages to production, exit pre-release mode and create a PR to the `development` branch. Run the command below and create a PR.

```
yarn changeset pre exit
```

- Merge development to main branch
