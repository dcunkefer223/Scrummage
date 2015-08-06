## Git Process


-working on your own local feature branch

 git commit
 git push origin <feature branch name>
 git rebase origin/development

##WHEN SOMEONE MERGES
git fetch origin development
git rebase origin/development

^This is where a merge conflict might occur, refer to
"IF THERE IS A CONFLICT" to solve this.


##IF THERE IS A CONFLICT
	It will tell you 'CONFLICT: <file name>'.
	Go to that file name, manually resolve the conflict.

	git add <file name with conflict>
	git commit 
	git rebase --continue

##BRANCH NAMING
  Be sure to use <first name feature name> for branch names.

