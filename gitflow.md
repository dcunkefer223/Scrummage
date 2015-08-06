## Git Process


-working on your own local feature branch

 git commit
 git push origin <feature branch name>
 git rebase origin/development

 IF THERE IS A CONFLICT:
 	It will tell you 'CONFLICT: <file name>'.
 	Go to that file name, manually resolve the conflict.

 	git add <file name with conflict>
 	git commit 
 	git rebase --continue

 	


