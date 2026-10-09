fetch("db.json").then(response => response.json()).then(function (pkgs){
    Object.entries(pkgs.packages).forEach(pkg => createPkgBox(pkg[1]));
});

function createPkgBox(pkg){
    const main = document.getElementsByTagName("main")
    const newPkgBox = document.createElement("div");
    const newPkg = document.createElement("a");
    const newVersion = document.createElement("p");
    const newDesc = document.createElement("p");

    newPkgBox.className = "pkgbox";
    newPkg.className = "pkg";
    newDesc.className = "pkgdesc";
    newVersion.className = "pkgver";

    newPkg.innerHTML = pkg.pkgname;
    newVersion.innerHTML = "<b>Package version:</b> " + pkg.pkgversion;
    newDesc.innerHTML = "<b>Package description:</b> " + pkg.pkgdesc;

    newPkg.href = `build-${pkg.pkgname}-${pkg.pkgversion}.tar.gz`

    newPkgBox.appendChild(newPkg);
    newPkgBox.appendChild(newVersion);
    newPkgBox.appendChild(newDesc);
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
            pkg.hidden = false;
            pkg.hidden = (pkg.firstChild.innerText.match(document.getElementById("searchInput").value) == null);
            if (!pkg.hidden) result++;
        }

        document.getElementById("searchResult").innerHTML = `Showing <b>${result}</b> out of <b>${total}</b>`;
    }
}
