ng build --prod &
npx cap sync android &
cd android &
./gradlew assembleRelease