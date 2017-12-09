/*************
 * remove_cockpit_symlink
 * 
 * Removes a symlink if one was created previously. 
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

//Determine if the symlink exists
fs.lstat(
    moduleFolderName, 
    (err, stats) => {
        if (err !== null) {
            if (err.code === "ENOENT") {
                console.log("No symlink exists - nothing to do here");
            } else {
                console.log(err);
            }
            return;
        }

        if (stats.isSymbolicLink()) {
            //If it exists, remove it
            console.log("Found a symbolic link - removing...")
            fs.unlink(
                moduleFolderName,
                (err, stats) => {
                    if (err !== null) {
                        console.log(err);
                        return;
                    }
                }
            )
        }
    });