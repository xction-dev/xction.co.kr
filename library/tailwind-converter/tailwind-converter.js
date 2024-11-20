/**
 * modules.css 및 css 파일들을 tailwindcss에 맞게 convert하는 script입니다.
 * 디렉토리 루트에서 다음과 같이 실행 가능합니다.
 * node library/tailwind-converter/tailwind-converter.js
 */
/**
 * 안정성을 위해 client/src/app과 client/src/components로 나누어 작업합니다.
 */

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");

/**
 * 해당 디렉토리 안에 있는 모든 css file들을 불러옵니다.
 * 두 가지 Map을 생성합니다.
 * modulesCssMap : "*.module.css"와 이를 import하는 tsx 파일
 * normalCssMap: "*.css"와 이를 import하는 tsx 파일
 */
function getAllCssFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // CSS files path를 모두 불러옴
  let paths = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name); // ex) /xction.co.kr/client/src/components/Input
    if (entry.isDirectory()) {
      paths = paths.concat(getAllCssFiles(fullPath)); // 디렉토리인 상태면 resolve되지 않았으므로 재귀 탐색 계속 실행
    } else if (entry.isFile() && fullPath.endsWith(".css")) {
      paths.push(fullPath);
    }
  }

  return paths;
}

function mapCss(paths) {
  const modulesCssMap = new Map();
  const normalCssMap = new Map();

  // files 내 items를 moduleCss와 normalCss로 나누고, tsx와 함께 Map에 배정
  paths.forEach((cssPath) => {
    const dir = path.dirname(cssPath);
    const entries = fs.readdirSync(dir);
    const tsxPath = entries
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => path.join(dir, file));

    if (cssPath.endsWith(".module.css")) {
      modulesCssMap.set(cssPath, tsxPath);
    } else {
      normalCssMap.set(cssPath, tsxPath);
    }
  });

  // Map 내 복수의 tsx path 가진 key들 찾기 위한 test code
  //   normalCssMap.forEach((val, key) => {
  //     val.length > 1 && console.log("more than one tsx!");
  //   });

  return { modulesCssMap, normalCssMap };
}

function convertToTailwind(cssMap) {
  // 사용된 css properties 산출
  const properties = new Set();
  cssMap.forEach((val, key) => {
    if (
      key !==
      "/Users/baek-changin/xction.co.kr/client/src/components/Button/BasicButton/BasicButton.module.css"
    )
      return;

    const css = fs.readFileSync(key, "utf8");

    const root = postcss.parse(css);
    const convertedClasses = {};

    root.walkRules((rule) => {
      const className = rule.selector.replace(".", "").trim();
      convertedClasses[className] = [];
      console.log(convertedClasses);

      rule.walkDecls((decl) => {
        const property = decl.prop;
        const value = decl.value;
        properties.add(property);
      });
    });
    console.log(properties);

    // const tsxClasses = Object.entries(convertedClasses)
    //   .map(([className, twClasses]) => `${className}: "${twClasses.join(" ")}"`)
    //   .join(",\n ");
    // const tsxFileName = path.basename(val);
    // const testFileName = `test_${tsxFileName}`;
    // const outputFilePath = path.resolve(path.dirname(val), testFileName);

    // const outputTsx = `export const styles = {\n  ${tsxClasses}\n};\n`;

    // fs.writeFileSync(outputFilePath, outputTsx, "utf8");

    // console.log(`Generated file: ${outputFilePath}`);
  });
  //   console.log(`Properties:`, Array.from(properties));
}

/**************
 * Test *******
 **************/
const componentDir = path.resolve(__dirname, "../../client/src/components");
const appDir = path.resolve(__dirname, "../../client/src/app");

const componentCssPaths = getAllCssFiles(componentDir);
const appCssPaths = getAllCssFiles(appDir);

const componentCssMap = mapCss(componentCssPaths);
const appCssMap = mapCss(appCssPaths);

const componentModuleTailwind = convertToTailwind(
  componentCssMap.modulesCssMap,
);
// const componentNormalTailwind = convertToTailwind(componentCssMap.normalCssMap);
// const appNormalTailwind = convertToTailwind(appCssMap.normalCssMap);

/**
 * 테스트 실행 결과
 * app 디렉토리 내 module.css: 1개, normalCss: 14개
 * component 디렉토리 내 module.css: 22개, normalCss: 6개
 * app 디렉토리 내 module.css는 신경쓰지 않아도 된다. 메인페이지 관련이고 아직 작업하지 않았기 때문에.
 * 즉 module.css의 convert 로직은 component 안에서만 생각하기
 * 사용
 */

/**************
 * Run Script *
 **************/
