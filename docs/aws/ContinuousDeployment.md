# Continuous Deployment

> *Note:* This is an optional step to keep the deployment in your account in sync with the source code repository automatically.

For this to work you need to fork the source code in order to register the webhook listener that trigger an update to your deployment.

After forking, make sure to update the `repository.url` in your forks `package.json`.

This will set up a CodePipeline project which triggers a CodeBuild project for every push to the `saga` branch. You can configure the branch in the `deploy.branch` property of the `package.json`. The CodeBuild project updates the CloudFormation stack which contains the Bifravst resources. 

## Provide GitHub credentials

You need to create a [developer token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with `repo` and `admin:repo_hook` permissions for an account that has write permissions to your repository. 

> 🚨 It is recommended to use a separate GitHub account for this, not your personal GitHub account.

You need to store this token in AWS ParameterStore which is a **one-time** manual step done through the AWS CLI: 

	aws ssm put-parameter --name /codebuild/github-token --type String --value <Github Token>
	aws ssm put-parameter --name /codebuild/github-username --type String --value <Github Username>

## Enable Continuous Deployment

Now you can set up the continuous deployment:

	npx cdk -a 'node dist/cloudformation-cd.js' deploy