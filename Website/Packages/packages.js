fetch("db.json").then(response => response.json()).then(function (pkgs){
    Object.entries(pkgs.packages).forEach(pkg => createPkgBox(pkg[1]));
});

function createPkgBox(pkg){
    const main = document.getElementsByTagName("main")
    const newPkgBox = document.createElement("div");
    const newPkg = document.createElement("a");
    const newVersion = document.createElement("p");
    const newDesc = document.createElement("p");
    const newDeps = document.createElement("p");
    const newAliases = document.createElement("p");
    const newUseflags = document.createElement("p");

    newPkgBox.className = "pkgbox";
    newPkg.className = "pkg";
    newDesc.className = "pkgdesc";
    newVersion.className = "pkgver";
    newDeps.className = "pkgdeps"
    newAliases.className = "pkgaliases"
    newUseflags.className = "pkguseflags"

    newPkg.innerHTML = pkg.pkgname;
    newVersion.innerHTML = "<b>Package version:</b> " + pkg.pkgversion;
    newDesc.innerHTML = "<b>Package description:</b> " + pkg.pkgdesc;
    newDeps.innerHTML = "<b>Dependencies:</b> " + pkg.pkgdeps.toString().replaceAll(",", " ");
    newAliases.innerHTML = "<b>Aliases:</b> " + pkg.pkgaliases.toString().replaceAll(",", " ");
    newUseflags.innerHTML = "<b>Useflags:</b> " + pkg.useflags.toString().replaceAll(",", " ");

    newPkg.href = `build-${pkg.pkgname}-${pkg.pkgversion}.tar.gz`

    newPkgBox.appendChild(newPkg);
    newPkgBox.appendChild(newVersion);
    newPkgBox.appendChild(newDesc);
    newPkgBox.appendChild(newDeps);
    if(pkg.useflags[0] != ""){
        newPkgBox.appendChild(newAliases);
        newPkgBox.appendChild(newUseflags);
    }
    main[0].appendChild(newPkgBox);
}

document.getElementById("searchInput").onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;

    if (keyCode == 'Enter') {
        const pkgboxes = document.getElementsByClassName("pkgbox");
        var total = pkgboxes.length;
        var result = 0;

        for(let pkg of pkgboxes){
            let aliases = pkg.children[4].innerText.split(" ");
            let query = document.getElementById("searchInput").value;
            aliases.shift();
            pkg.hidden = false;
            pkg.hidden = (aliases.includes(query)) ? false : (pkg.firstChild.innerText.match(query) == null);
            if (!pkg.hidden) result++;
        }

        document.getElementById("searchResult").innerHTML = `Showing <b>${result}</b> out of <b>${total}</b>`;
    }
}
