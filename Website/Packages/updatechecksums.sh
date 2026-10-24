for PACKAGE in db/sync/*; do
    source $PACKAGE/info
    echo $MOONPKGNAME
    SHA256SUM=$(sha256sum build-$MOONPKGNAME-$MOONPKGVERSION.tar.gz)
    SHA256SUM=${SHA256SUM%% *}
    sed -i "/SHA256SUM/d" $PACKAGE/info
    sed -i "/SRC=/ a\SHA256SUM=\"$SHA256SUM\"" $PACKAGE/info
done
