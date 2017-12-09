/*************
 * uninstall_src_submodule
 * 
 * Removes a Git repo as a submodule under src/ . Best to run this while in a clean repo state. 
 * If src/ contains no submodule
 * 
 * Only tested on Linux machines. 
 */

'use strict';
const { spawnSync } = require( 'child_process' );
const { existsSync } = require('fs');
const vc = require('version_compare');
const { confirm } = require('node-ask');

//Check we are running this from npm run ...
if (!process.argv[0].endsWith("node")) {
    console.log("Please run this script using\nnpm run uninstall-src");
    return;
}

//Check something exists under src/
if (!existsSync("src")) {
    console.log("The src/ directory is empty - it appears that no submodule is installed.");
    return;
}

//Check if a submodule exists in src/
const git_check_submodule_cmd = spawnSync( 'git', [ 'config', '--file', '.gitmodules', '--name-only', '--get-regexp', 'path' ] );
let git_check_out = git_check_submodule_cmd.stdout.toString();
if (!git_check_out.includes("submodule.src.path")) {
    console.log("The src/ directory does not appear to contain a submodule");
    return;
}

// Check the git version - my intended method for module removal only works
// on 1.8.6 and above - https://stackoverflow.com/a/21211232
const git_version_cmd = spawnSync( 'git', [ '--version' ] );

// Get and clean the version number
let git_version = git_version_cmd.stdout.toString();
git_version = git_version.replace("git version ", "").trim();
let is_git_version_ok = vc.compare(git_version, "1.8.6"); //Returns a number  - if higher than 0 we are good

if ( is_git_version_ok > 0 ) {

    //Confirm..
    console.log("Uninstalling a src directory should only be done with a clean repo.");
    confirm('Are you sure you wish to proceed? (y/n)\n')
        .then( (proceed) => {
            if (proceed) {
                console.log("Removing /src submodule from repository");
                
                const git_rm_cmd = spawnSync( 'git', [ 'rm', '-rf', 'src' ] );
                console.log(`${git_rm_cmd.stdout.toString()}`);
                console.log(`${git_rm_cmd.stderr.toString()}`);
            
                const git_config_clean_cmd = spawnSync( 'git', [ 'config', "-f", ".git/config", "--remove-section", "submodule.src" ] );  
                console.log(`${git_config_clean_cmd.stdout.toString()}`);    
                console.log(`${git_config_clean_cmd.stderr.toString()}`);  
            
                const sys_rm_cmd = spawnSync( 'rm', [ '-rf', '.git/modules/src' ] ); 
                console.log(`${sys_rm_cmd.stdout.toString()}`);    
                console.log(`${sys_rm_cmd.stderr.toString()}`);  
            }
        });
} else if ( is_git_version_ok < 0 ) {
    console.log("Your git version does not support simple submodule removal.\nTry Googling for a method that will work with git " + git_version);

} else {
    console.log("This script has a bug - please report it to the author");    

}