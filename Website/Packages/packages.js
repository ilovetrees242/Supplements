fetch("db.json").then(response => response.json()).then(function (pkgs){
    for(const [name,pkg] of Object.entries(pkgs.packages)){
        createPkgBox(pkg);
    }
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
