/**
 * This is the main configuration for the three different enviornment types
 *
 * Please check before building or archiving
 */

const DEVELOPMENT = {
  janusURL: "http://janus-dev.us-east-1.elasticbeanstalk.com/janus",
  metaSeventhURL:
    "ws://metaseventhapi2-env.eba-md7xxrjq.us-east-1.elasticbeanstalk.com/",
  restURL: "https://staging-api.seventhave.io",
  version: "staging",
  patchNotes: "",
};
const STAGING = {
  janusURL: "http://janus-staging.us-east-1.elasticbeanstalk.com/janus",
  metaSeventhURL: "ws://metaseventhapi3.us-east-1.elasticbeanstalk.com/",
  restURL: "https://staging-api.seventhave.io",
  version: "staging",
  patchNotes: "Added timer, in room reporting",
};
const PRODUCTION = {
  janusURL: "http://janus-seventh.us-east-1.elasticbeanstalk.com/janus",
  metaSeventhURL:
    "ws://metaseventhapi-env.eba-ifkrqnk3.us-east-1.elasticbeanstalk.com/",
  restURL: "https://api.seventhave.io",
  version: "26.9",
  patchNotes: "Added timer, in room reporting",
};

export default DEVELOPMENT;
