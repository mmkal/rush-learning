set -e

echo "making sure branch isn't ahead of origin"
git status | grep "up to date with 'origin/main'"

branch_name="test-change-$(date '+%Y-%m-%d-%H-%M-%S')"
git checkout -b $branch_name
echo "created branch. Delete with:"
echo "git checkout main && git branch -D $branch_name"
echo "// comment from $branch_name" >> packages/pkg-a/index.js
git commit -am "Added comment from $branch_name"
rush change --bulk --bump-type patch --message "$branch_name"
git add common/changes
git commit -m "Add changefile(s)"
git checkout main
git merge --squash $branch_name
git commit --no-edit

echo "bump versions by running this command:"
echo "rush version --bump --target-branch main"
