echo Наименование компонента: 
read a
a=$(echo $a | sed 's/[^0-9 a-z A-Z [:punct:]]//g')
/c/Program\ Files\ \(x86\)/GnuWin32/bin/tree.exe -d ./src/components
mkdir ./src/components/$a
touch ./src/components/$a/_$a.sass
touch ./src/components/$a/$a.pug
echo -e ".$a\n    display: block" >> ./src/components/$a/_$a.sass
echo @import \"./$a/_$a.sass\" >> ./src/components/_components.sass