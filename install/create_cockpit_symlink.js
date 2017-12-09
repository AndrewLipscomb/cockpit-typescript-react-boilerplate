/*************
 * create_cockpit_symlink
 * 
 * Sniffs out the user's local Cockpit module folder and symlinks to the repo root
 * This will allow Cockpit to load the module for this user. If a global install is required,
 * you may need to manually move the module to a more root-y dir (check Cockpit's docs for install
 * locations). 
 * 
 * Only tested on Linux machines.
 */

'use strict';
//Imports filesystem tools
const fs = require('fs');
const os = require('os');

//Get the target symlink dir. Assumes that is /$HOME/.local/share/cockpit
const targetDir = os.homedir() + "/.local/share/cockpit";
//Change directory, as symlink must be run in the dir in which the symlink should reside
process.chdir(targetDir);

//Get the root module dir. Assumes we are in /install
const moduleRootDir = __dirname.substring(0, __dirname.lastIndexOf('/'));
//Gets the folder name for a symlink name
const moduleFolderName = moduleRootDir.substring( moduleRootDir.lastIndexOf('/') + 1, moduleRootDir.length );

console.log("Linking " + targetDir + " to " + moduleRootDir + " as " + moduleFolderName);

//Make the link, display errors if present
fs.symlink(
    moduleRootDir,
    moduleFolderName,
    "dir",
    (err) => {
        if (err !== null) {
            console.log(err);
        }
    }
);