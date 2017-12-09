/*************
 * install_src_submodule
 * 
 * Installs a Git repo as a submodule under src/ . Best to run this while in a clean repo state. 
 * 
 * Only tested on Linux machines. 
 */

'use strict';
const { spawnSync } = require( 'child_process' );
const { existsSync } = require('fs');
const isGitUrl = require('is-git-url');
const { confirm } = require('node-ask');

//Check we are running this from npm run ...
if (!process.argv[0].endsWith("node")) {
    console.log("Please run this script using\nnpm run install-src -- <my-source-repo>");
    return;
}

//Check no existing submodule is under src/
if (existsSync("src")) {
    console.log("The src/ directory is not empty - installing a submodule will overwrite it");
    console.log("You will need to fix this manually by either removing the existing src/ folder or removing the submodule which exists under /src");
    return;
}

// Get the repo argument
if (process.argv.length === 3) {
    let git_repo = process.argv[2];

    //Validate this is in fact a git repo address
    if (!isGitUrl(git_repo)) {
        console.log("You need to specify a legitimate Git repo address to use");
        return;
    }

    console.log("Installing a src directory should only be done with a clean repo.");
    confirm('Are you sure you wish to proceed? (y/n)\n')
        .then( (proceed) => {
            if (proceed) {
                console.log("Installing into src/");
                const git_add_submodule_cmd = spawnSync( 'git', [ 'submodule', 'add', git_repo, 'src' ] );
                console.log(`${git_add_submodule_cmd.stdout.toString()}`);
                console.log(`${git_add_submodule_cmd.stderr.toString()}`);
            
                const git_submodule_update_cmd = spawnSync( 'git', [ 'submodule', 'update' ] );
                console.log(`${git_add_submodule_cmd.stdout.toString()}`);
                console.log(`${git_add_submodule_cmd.stderr.toString()}`);
            
                console.log("Installation complete - please commit the current submodule before making further changes.");
            }
        });

} else if (process.argv.length === 2) {
    console.log("You need to specify a Git repo to use as a source submodule");

} else {
    console.log("This script expects only one argument for a Git repo source");

}
