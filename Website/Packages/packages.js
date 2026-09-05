const pkgdb_path = "db/sync/";
const packages = [ 
    "acl","attr","autoconf","automake","bash","bc","binutils","bison","bzip2","cmake","cmatrix","coreutils","dbus","dejagnu","diffutils","dosfstools","e2fsprogs","elfutils","expat","expect","fastfetch","file","findutils","flex","flit-core","gawk","gcc","gdbm","gettext","glibc","gmp","gperf","grep","groff","gzip","htop","hwdata","iana-etc","inetutils","intltool","iproute2","jinja2","kbd","kmod","libcap","libelf","libffi","libgcc","libpipeline","libstdc++","libtool","libxcrypt","linux","linux-api-headers","linux-pam","lz4","m4","make","man-db","markupsafe","meson","mpc","mpfr","ncurses","neofetch","ninja","openssl","packaging","patch","pciutils","pcre2","perl","pkgconf","procps-ng","psmisc","python","ranger","readline","sed","setuptools","shadow","sqlite","synfetch","systemd","tar","tcl","texinfo","tzdata","util-linux","vim","wheel","which","xml-parser","xorriso","xz","yyjson","zlib","zstd"
];

async function readInfo(pkgbox, name){
    const infoFile = await fetch(pkgdb_path + name + "/info");
    const text = await infoFile.text();
    const info = pkgbox.children;

    let pkgname, pkgversion, pkgdescription;

    pkgname = text.slice(text.indexOf("MOONPKGNAME="), text.length)
    pkgname = pkgname.slice(pkgname.indexOf("\"") + 1, pkgname.indexOf("\"", pkgname.indexOf("\"") + 1));
    pkgversion = text.slice(text.indexOf("MOONPKGVERSION="), text.length)
    pkgversion = pkgversion.slice(pkgversion.indexOf("\"") + 1, pkgversion.indexOf("\"", pkgversion.indexOf("\"") + 1));

    pkgdescription = text.slice(text.indexOf("DESC="), text.length)
    pkgdescription = pkgdescription.slice(pkgdescription.indexOf("\"") + 1, pkgdescription.indexOf("\"", pkgdescription.indexOf("\"") + 1));

    info[0].innerText = pkgname
    info[0].href = `build-${pkgname}-${pkgversion}.tar.gz`
    info[1].innerHTML += pkgversion
    info[2].innerHTML += pkgdescription
}
function createPkgBox(){
    const main = document.getElementsByTagName("main")
    const newPkgBox = document.createElement("div");
    const newPkg = document.createElement("a");
    const newVersion = document.createElement("p");
    const newDesc = document.createElement("p");

    newPkgBox.className = "pkgbox";
    newPkg.className = "pkg";
    newDesc.className = "pkgdesc";
    newVersion.className = "pkgver";
    newVersion.innerHTML = "<b>Package version:</b> ";
    newDesc.innerHTML = "<b>Package description:</b> ";

    newPkgBox.appendChild(newPkg);
    newPkgBox.appendChild(newVersion);
    newPkgBox.appendChild(newDesc);
    main[0].appendChild(newPkgBox);

    return newPkgBox;
}

for(pkg of packages){
    readInfo(createPkgBox(), pkg)
}
