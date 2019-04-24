module.exports = app => {
  app.on(['check_suite.requested', 'check_run.rerequested'], check);

  async function check (context) {
    const startTime = new Date();
    const { head_branch: headBranch, head_sha: headSha } = context.payload.check_suite;
    var result = context.github.checks.create(context.repo({
      name: 'Is it Friday?',
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startTime,
      conclusion: 'success',
      completed_at: new Date(),
      output: {
        title: 'No, it is not',
        summary: 'It is not Friday, please go ahead and merge.'
      }
    }));
    
    if(startTime.getDay() == 5 ) {
      result = context.github.checks.create(context.repo({
        name: 'Is it Friday?',
        head_branch: headBranch,
        head_sha: headSha,
        status: 'completed',
        started_at: startTime,
        conclusion: 'failure',
        completed_at: new Date(),
        output: {
          title: 'Yes! 🚨🚨It is Friday🚨🚨',
          summary: 'Are you sure you want to merge?',
          "images": [
            {
              "alt": "Begging Cat",
              "image_url": "https://i.pinimg.com/originals/27/69/f3/2769f3f85137a2baa2b51462627d3c24.jpg"
            }
          ]
        }
      }));
    }
    
    return result;
  }

}
