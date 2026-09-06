echo "{" > db.json
echo "  \"packages\": {" >> db.json

COUNTER=3

for PACKAGE in $(ls db/sync); do
    if [ -s db/sync/$PACKAGE/info ]; then
        source db/sync/$PACKAGE/info
        echo "" >> db.json
        DESC=$(echo $DESC | sed 's/\//\\\//g')
        sed -i "$COUNTER s/^.*/    \"$MOONPKGNAME\": { \"pkgname\": \"$MOONPKGNAME\", \"pkgversion\": \"$MOONPKGVERSION\", \"pkgdesc\": \"$DESC\" },/" db.json || echo $DESC
        ((COUNTER++))
    fi
done

sed -i '$s/,$//' db.json

echo "  }" >> db.json
echo "}" >> db.json
