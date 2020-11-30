branch_name="test-change-$(date '+%Y-%m-%d-%H-%M-%S')"
git checkout -b $branch_name
echo "created branch. Delete with:"
echo "git checkout main && git branch -D $branch_name"
echo "// comment from $branch_name" >> packages/pkg-a/index.js
git commit -am "Added comment from $branch_name"
rush change --bulk --bump-type patch --message "$branch_name"
