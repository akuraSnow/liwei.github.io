function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// @ts-ignore
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { Text } from 'slate';
import { Element, Leaf, MarkIcon, MarkSubscript, MarkVertAlign, MarkTextIndent, MarkWordSpace, Symbol as _Symbol, MarkInsertFormula, MarkAlignment, UnorderedSorting, OrderSorting, MarkColor, MarkFont, MarkFormulaEditor } from './richtextDetail';
import { bold, centerAlignment, disorder, Italic, leftAlignment, order, point, rightAlignment, strikeout, subscript, superscript, textIndent, underline, wordspace, lineSpace } from './toolbarIcon';
import { TextIndentList, LineSpaceList, ListWordSpace, fontSizeList, fontList, fontObj, fontSizeObj, showMathJax } from './client';
import { Editor, Operation, Transforms, Node, createEditor, Path } from 'slate';
import { withHistory, HistoryEditor } from 'slate-history';
import { Toolbar } from './components';
import FormulaEditor from './components/FormulaEditor';
import "./richtext.css";
import _ from 'lodash'; // import { Tips } from '../../components/index';

import { Tips } from '../../MessageTips/index';
import UploadFile from './components/UploadFile';

var RichText = function RichText(props) {
  var _useState = useState(props.value),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocuse = _useState4[0],
      setIsFocuse = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSelection = _useState6[0],
      setIsSelection = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      formula = _useState8[0],
      setFormula = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      selection = _useState10[0],
      setSelection = _useState10[1];

  var _useState11 = useState(props.modalPosition),
      _useState12 = _slicedToArray(_useState11, 2),
      modalPosition = _useState12[0],
      setModalPosition = _useState12[1];

  var _useState13 = useState(props.modalPositionInsertFormula),
      _useState14 = _slicedToArray(_useState13, 2),
      modalPositionInsertFormula = _useState14[0],
      setModalPositionInsertFormula = _useState14[1];

  var _useState15 = useState(props.isInBox),
      _useState16 = _slicedToArray(_useState15, 2),
      isInBox = _useState16[0],
      setIsInBox = _useState16[1];

  var _useState17 = useState(props.search),
      _useState18 = _slicedToArray(_useState17, 2),
      search = _useState18[0],
      setSearch = _useState18[1];

  var _useState19 = useState('请输入内容'),
      _useState20 = _slicedToArray(_useState19, 2),
      placeholder = _useState20[0],
      setPlaceholder = _useState20[1]; // const [insertCompositionText, setInsertCompositionText] = useState(false);


  var editorRef = useRef();
  var renderElement = useCallback(function (props) {
    return /*#__PURE__*/React.createElement(Element, props);
  }, []);

  var renderLeaf = function renderLeaf(props) {
    return /*#__PURE__*/React.createElement(Leaf, props);
  };

  var editor = useMemo(function () {
    return withMentions(withHistory(withReact(createEditor())), props);
  }, []); // 对常见错误的字段进行检查

  var decorate = useCallback(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node = _ref2[0],
        path = _ref2[1];

    var newRanges = [];
    var len = search.length !== 0;

    if (len && Text.isText(node)) {
      var text = node.text;
      search.forEach(function (item, index) {
        var texts = text;
        var markLen = index + 1;
        var replaceStr = '**';

        for (var j = 0; j < markLen; j++) {
          replaceStr += '>';
        }

        ;
        replaceStr += '**';
        item.forEach(function (el) {
          if (el !== '+' && el !== '[' && el !== '(' && el !== ')' && el !== ']') {
            texts = texts.replace(new RegExp("".concat(el), 'g'), replaceStr);
          } else {
            texts = texts.replace(new RegExp("\\".concat(el), 'g'), replaceStr);
          }
        }); // 标记高亮字段

        var parts = texts.split(replaceStr);
        var offset = 0;
        parts.forEach(function (part, i) {
          if (part[i] === '' && i === 0) {
            newRanges.push({
              anchor: {
                path: path,
                offset: offset
              },
              focus: {
                path: path,
                offset: offset + markLen
              },
              highlight: true
            });
            offset = offset + markLen;
            return true;
          }

          if (i !== 0) {
            newRanges.push({
              anchor: {
                path: path,
                offset: offset
              },
              focus: {
                path: path,
                offset: offset + markLen
              },
              highlight: true
            });
            offset = offset + part.length + markLen;
            return true;
          } else {
            offset = offset + part.length;
          }
        });
      });
    }

    ; // 排序

    newRanges.sort(function (pre, next) {
      if (pre.anchor && next.anchor) {
        var d = Path.compare(pre.anchor.path, next.anchor.path);

        if (d === 0) {
          return pre.anchor.offset - next.anchor.offset;
        } else {
          return d;
        }
      }

      return false;
    }); // 归并

    var finalRanges = newRanges.reduce(function (acc, item1) {
      var len = acc.length;
      var item = JSON.parse(JSON.stringify(item1));

      if (len) {
        if (Path.compare(acc[len - 1].anchor.path, item.anchor.path) === 0) {
          if (acc[len - 1].focus.offset === item.anchor.offset) {
            // !如果是连续的range位置
            acc[len - 1].focus.offset = item.focus.offset;
          } else {
            // !非连续位置
            acc.push(item);
          }
        } else {
          // 跨元素
          acc.push(item);
        }
      } else {
        // 第一次进入
        acc.push(item);
      }

      return acc;
    }, []);
    return finalRanges;
  }, [search]);
  useEffect(function () {
    setSearch(props.search);
  }, [props.search]);

  var addDblEvent = function addDblEvent(e) {
    if (navigator.onLine) {
      setSelection(editor.selection);
      setFormula(getMathML(e.target));
    } else if (e.target.className && e.target.className.indexOf('buttonTitle') === -1) {
      Tips.open({
        message: '网络错误，请稍后重试',
        type: 'fail'
      });
    }
  };

  var getMathML = function getMathML(el) {
    if (el.getAttribute && (!el.getAttribute('class') || el.getAttribute('class').indexOf('richBox') < 0)) {
      if (el.getAttribute('class') && el.getAttribute('class').indexOf('MathJax') !== -1) {
        return el.getAttribute('data-mathml');
      } else {
        return getMathML(el.parentNode);
      }
    } else {
      return null;
    }
  };

  useEffect(function () {
    setIsInBox(props.isInBox);
  }, [props.isInBox]);
  useEffect(function () {
    setValue(props.value);
    setTimeout(function () {
      var current = editorRef.current;
      current && current.addEventListener('dblclick', addDblEvent);
      return function cleanup() {
        current.removeEventListener('dblclick', addDblEvent);
      };
    }, 0);
  }, [props.isFilled]);
  useEffect(function () {
    setModalPosition(props.modalPosition);
  }, [JSON.stringify(props.modalPosition)]);
  useEffect(function () {
    setModalPositionInsertFormula(props.modalPositionInsertFormula);
  }, [JSON.stringify(props.modalPositionInsertFormula)]);

  function isSelections() {
    var selection = editor.selection;

    if (selection && selection.anchor && selection.focus && JSON.stringify(selection.anchor.path) !== JSON.stringify(selection.focus.path)) {
      return true;
    } else {
      return false;
    }
  }

  function updateFormula(formula) {
    // TODO: 插入公式可能存在问题需要后续优化
    if (formula) {
      // @ts-ignore
      Transforms.setSelection(editor, selection);
      var tag;

      (function () {
        var children = editor; // @ts-ignore

        var _path = JSON.parse(JSON.stringify(selection.anchor.path));

        _path.splice(-2);

        _path.forEach(function (key) {
          children = children.children[key];
        }); // @ts-ignore


        tag = children.children[selection.anchor.path[selection.anchor.path.length - 2]].tag;
      })(); // @ts-ignore


      Transforms.insertNodes(editor, {
        type: 'mention',
        mediaType: 'FORMULA',
        character: formula,
        tag: String(Math.random()).replace('\.', ''),
        children: [{
          text: ' ',
          mark: []
        }]
      }, {
        // @ts-ignore
        at: selection
      });
      var newSelection = JSON.parse(JSON.stringify(selection));

      (function () {
        var children = editor; // @ts-ignore

        var _path = JSON.parse(JSON.stringify(selection.anchor.path));

        _path.splice(-2);

        _path.forEach(function (key) {
          children = children.children[key];
        });

        children.children.forEach(function (child, index) {
          if (child.tag === tag) {
            newSelection.anchor.path[newSelection.anchor.path.length - 2] = index;
            newSelection.focus.path[newSelection.focus.path.length - 2] = index;
          }
        });
      })();

      Transforms.delete(editor, {
        at: newSelection
      });
    }

    setSelection(null);
    setFormula(null);
    setTimeout(function () {
      showMathJax(true);
    }, 0);
  } // @ts-ignore


  return /*#__PURE__*/React.createElement("div", {
    // @ts-ignore
    ref: editorRef,
    className: 'richBox'.concat(" ", isFocuse ? 'isChoose' : '')
  }, /*#__PURE__*/React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(e) {
      // const { selection } = editor;
      // setValue(e);
      var element = [];

      if (e.length === 1 && e[0].children.length === 1 && e[0].children[0].text === '' && !e[0].children[0].isAdd) {
        element = [{
          children: [{
            text: ''
          }],
          styles: [],
          type: 'Left'
        }];
      } else if (e.length && e[0].NumberedList) {
        if (e.length === 1 && e[0].children.length === 1 && e[0].children[0].children.length === 1 && e[0].children[0].children[0].text === '') {
          element = [{
            NumberedList: e[0].NumberedList,
            children: [{
              children: [{
                text: ''
              }],
              styles: [],
              type: 'Left',
              ListItem: true
            }]
          }];
        } else if (e[0].children[0].children[0].text === '') {
          element = _.cloneDeep(e);
          element[0].children[0].ListItem = true;
        } else {
          element = e;
        }
      } else {
        element = e;
      }

      if (!e.length) {
        element = [{
          children: [{
            text: ''
          }],
          styles: [],
          type: 'Left'
        }];
      }

      if (JSON.stringify(element) !== JSON.stringify(value)) {
        props.changeValue(element);
        setSearch([]);
      }

      setValue(element);
      console.log("RichText -> element", element);
    }
  }, isFocuse || props.isFistRich ? /*#__PURE__*/React.createElement("div", {
    className: 'Toolbar'
  },
  /*#__PURE__*/
  // @ts-ignore
  React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(MarkFont, {
    format: 'Font',
    fontList: fontList,
    fontObj: fontObj,
    width: 98,
    title: "\u5B57\u4F53"
  }), /*#__PURE__*/React.createElement(MarkFont, {
    format: 'FontSize',
    fontList: fontSizeList,
    fontObj: fontSizeObj,
    width: 54,
    title: "\u5B57\u53F7"
  }), /*#__PURE__*/React.createElement(MarkIcon, {
    format: 'Bold',
    icon: bold,
    title: "\u52A0\u7C97"
  }), /*#__PURE__*/React.createElement(MarkIcon, {
    format: 'Italic',
    icon: Italic,
    title: "\u503E\u659C"
  }), /*#__PURE__*/React.createElement(MarkSubscript, {
    format: 'UnderlineSingle',
    icon: underline,
    title: "\u4E0B\u5212\u7EBF"
  }), /*#__PURE__*/React.createElement(MarkIcon, {
    format: 'Strike',
    icon: strikeout,
    title: "\u5220\u9664\u7EBF"
  }), /*#__PURE__*/React.createElement(MarkVertAlign, {
    format: 'VertAlignSubscript',
    icon: subscript,
    title: "\u4E0B\u6807"
  }), /*#__PURE__*/React.createElement(MarkVertAlign, {
    format: 'VertAlignSuperscript',
    icon: superscript,
    title: "\u4E0A\u6807"
  }), /*#__PURE__*/React.createElement(MarkIcon, {
    format: 'EmphasisDot',
    icon: point,
    title: "\u7740\u91CD\u5B57"
  }), /*#__PURE__*/React.createElement(MarkColor, {
    format: 'color',
    icon: order,
    title: "\u5B57\u4F53\u989C\u8272",
    color: props.color,
    changeColor: function changeColor(e) {
      return props.changeColor(e);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "Separate"
  }), /*#__PURE__*/React.createElement(MarkAlignment, {
    format: 'Left',
    icon: leftAlignment,
    title: "\u5DE6\u5BF9\u9F50"
  }), /*#__PURE__*/React.createElement(MarkAlignment, {
    format: 'Center',
    icon: centerAlignment,
    title: "\u5C45\u4E2D\u5BF9\u9F50"
  }), /*#__PURE__*/React.createElement(MarkAlignment, {
    format: 'Right',
    icon: rightAlignment,
    title: "\u53F3\u5BF9\u9F50"
  }), /*#__PURE__*/React.createElement(MarkWordSpace, {
    format: 'Wordspace',
    icon: wordspace,
    itemList: ListWordSpace,
    unit: "\u5B57\u7B26",
    title: "\u5B57\u95F4\u8DDD"
  }), /*#__PURE__*/React.createElement(MarkTextIndent, {
    format: 'LineSpace',
    icon: lineSpace,
    itemList: LineSpaceList,
    unit: "\u500D",
    title: "\u884C\u548C\u6BB5\u843D\u95F4\u8DDD"
  }), /*#__PURE__*/React.createElement(MarkTextIndent, {
    format: 'TextIndent',
    icon: textIndent,
    itemList: TextIndentList,
    unit: "\u5B57\u7B26",
    title: "\u9996\u884C\u7F29\u8FDB"
  }), /*#__PURE__*/React.createElement(UnorderedSorting, {
    format: 'NumberedList',
    icon: disorder,
    title: "\u65E0\u5E8F\u5217\u8868"
  }), /*#__PURE__*/React.createElement(OrderSorting, {
    format: 'NumberedList',
    icon: order,
    title: "\u6709\u5E8F\u5217\u8868",
    sortFormat: props.sortFormat,
    setFormat: props.setFormat
  }), /*#__PURE__*/React.createElement("span", {
    className: "Separate"
  }), /*#__PURE__*/React.createElement(MarkInsertFormula, {
    title: "\u4ECE\u56FE\u7247\u63D2\u5165\u516C\u5F0F",
    isFocuse: isFocuse // setVisible={props.setVisible && props.setVisible}
    ,
    modalPosition: modalPositionInsertFormula,
    postion: function postion(e) {
      if (e && e.isCloseMedoal) {
        setIsFocuse(false);
        delete e.isCloseMedoal;
      }

      props.positionInsertFormula && props.positionInsertFormula(e);
    },
    changeFocuse: function changeFocuse(e) {
      return setIsFocuse(e);
    }
  }), /*#__PURE__*/React.createElement(MarkFormulaEditor, {
    title: "\u63D2\u5165\u516C\u5F0F",
    isFocuse: isFocuse // setVisible={props.setVisible && props.setVisible}
    ,
    modalPosition: modalPositionInsertFormula,
    postion: function postion(e) {
      console.log('e====>', e);

      if (e && e.isCloseMedoal) {
        setIsFocuse(false);
        delete e.isCloseMedoal;
      }

      props.positionInsertFormula && props.positionInsertFormula(e);
    },
    changeFocuse: function changeFocuse(e) {
      return setIsFocuse(e);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "Separate"
  }), /*#__PURE__*/React.createElement(_Symbol, {
    title: "\u7B26\u53F7",
    isFocuse: isFocuse,
    setVisible: props.setVisible && props.setVisible,
    modalPosition: modalPosition,
    postion: props.postion && props.postion
  }))) : '', formula ? /*#__PURE__*/React.createElement(FormulaEditor, {
    formula: formula,
    onSubmit: function onSubmit(formula) {
      updateFormula(formula);
    }
  }) : '', /*#__PURE__*/React.createElement(Editable, {
    decorate: decorate,
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    placeholder: placeholder,
    style: {
      minHeight: props.isOption ? '14px' : '63px'
    },
    autoFocus: props.autoFocus ? props.autoFocus : false,
    onFocus: function onFocus() {
      console.error(1);
      setIsFocuse(true);
      props.isInBox && props.isInBox(true);
    },
    onBlur: function onBlur() {
      console.error(2);

      if (!modalPositionInsertFormula.visible || isInBox) {
        setIsFocuse(false);
      }
    },
    onMouseMove: function onMouseMove() {
      if (isSelections()) {
        setIsSelection(true);
      } else {
        setIsSelection(false);
      }
    },
    onDOMBeforeInput: function onDOMBeforeInput() {},
    onInput: function onInput() {
      if (isSelection || isSelections()) {
        editor.deleteFragment();
        setIsSelection(false);
      }
    },
    onKeyDown: function onKeyDown(event) {
      if (event.keyCode === 13 && props.isoption) {
        event.preventDefault();
      }

      var selection = editor.selection;

      if (selection && selection.anchor.offset === 0 && selection.focus.offset !== 0) {
        setSearch('');
      }

      if (isHotkey('delete', event) || isHotkey('backspace', event)) {
        if (!editor.selection) return false; // 2020/06/22 修改 删除会报错 editor.select === null;

        var path = editor.selection && editor.selection.anchor.path;
        var b = Node.parent(editor, editor.selection.anchor.path); // Editor.removeMark(editor, 'Bold');

        if (path && b && b.type === 'mention') {
          event.preventDefault();
          editor.deleteBackward({
            unit: 'character'
          });
        } // 处理首行是排序列表的时候，敲击回退键进行删除排序样式


        if (event.keyCode === 8) {
          var a = Node.get(editor, editor.selection.anchor.path);

          var _b = Node.parent(editor, editor.selection.anchor.path);

          if (a.text === '' && _b.ListItem && _b.children.length === 1 && editor.selection.anchor.path[0] === 0 && editor.selection.anchor.path[1] === 0) {
            Transforms.unwrapNodes(editor, {
              // @ts-ignore
              match: function match(n) {
                return n['NumberedList'];
              },
              split: true
            });
            Transforms.setNodes(editor, {
              'ListItem': false
            });
          }
        }

        var _selection = JSON.parse(JSON.stringify(editor.selection));

        var children = JSON.parse(JSON.stringify(editor.children));

        if (JSON.stringify(_selection.anchor) !== JSON.stringify(_selection.focus) && _selection.anchor.path[1] === 0 && _selection.anchor.offset === 0) {
          // patch: 判断是否从头选到尾
          if (_selection.anchor.path[0] === 0 && _selection.focus.path[0] === children.length - 1 && _selection.focus.path[1] === children[children.length - 1].children.length - 1 && _selection.focus.offset === children[_selection.focus.path[0]].children[_selection.focus.path[1]].text.length) {
            Transforms.removeNodes(editor);
          }
        }
      } else if (event.keyCode === 229) {
        var _path2 = editor.selection && editor.selection.anchor.path;

        if (isSelection || isSelections()) {
          event.preventDefault();
          editor.deleteFragment();
          setIsSelection(false);
        }
      } else if (isHotkey('Control+X', event) || isHotkey('Command+X', event)) {
        // 在剪切的时候，删除图片
        var _selection2 = JSON.parse(JSON.stringify(editor.selection));

        var selectionFragment = JSON.parse(JSON.stringify(Node.fragment(editor, _selection2)));

        var _children = JSON.parse(JSON.stringify(editor.children));

        var hasFormula = selectionFragment.filter(function (fragment) {
          return fragment.children.filter(function (child) {
            return child.mediaType === 'FORMULA' || child.mediaType === 'IMAGE';
          }).length;
        });
        console.log(hasFormula);

        if (hasFormula.length) {
          if (JSON.stringify(_selection2.anchor) !== JSON.stringify(_selection2.focus) && _selection2.anchor.path[1] === 0 && _selection2.anchor.offset === 0) {
            Transforms.removeNodes(editor, _selection2); // patch: 判断是否从头选到尾

            if (_selection2.anchor.path[0] === 0 && _selection2.focus.path[0] === _children.length - 1 && _selection2.focus.path[1] === _children[_children.length - 1].children.length - 1 && _selection2.focus.offset === _children[_selection2.focus.path[0]].children[_selection2.focus.path[1]].text.length) {
              Transforms.removeNodes(editor);
            }
          } else {
            Transforms.delete(editor, {
              at: _selection2
            });
          }

          event.preventDefault();
          var cloneActiveElement = JSON.stringify({
            fromCut: true,
            fragment: selectionFragment
          });
          var copyText = document.getElementById("copy_text");
          copyText.innerHTML = cloneActiveElement;
          copyText.readOnly = false;
          copyText.select();
          copyText.setSelectionRange(0, copyText.value.length);
          document.execCommand("copy");
          copyText.readOnly = true;
        }
      }
    }
  })));
};

var updateFragment = function updateFragment(fragmentData) {
  if (!fragmentData.children) {
    return fragmentData;
  }

  fragmentData.children = fragmentData.children.map(function (child) {
    if (child.children && child.mediaType !== 'FORMULA' && child.mediaType !== 'IMAGE') {
      var _updateFragment = updateFragment(child),
          children = _updateFragment.children;

      return Object.assign(Object.assign({}, child), {
        children: children
      });
    } else {
      child.tag = String(Math.random()).replace('\.', '');
      return child;
    }
  });
  return fragmentData;
};

var withMentions = function withMentions(editor, props) {
  var insertData = editor.insertData;
  var isInline = editor.isInline,
      isVoid = editor.isVoid;

  editor.undo = function () {
    var e = editor;
    var history = e.history;
    var undos = history.undos;

    if (undos.length > 0) {
      var batch = undos[undos.length - 1];
      HistoryEditor.withoutSaving(e, function () {
        Editor.withoutNormalizing(e, function () {
          var inverseOps = Array.from(batch.map(Operation.inverse).reverse());

          for (var _i2 = 0, _inverseOps = inverseOps; _i2 < _inverseOps.length; _i2++) {
            var op = _inverseOps[_i2];

            // If the final operation is deselecting the editor, skip it. This is
            if (op === inverseOps[inverseOps.length - 1] && // @ts-ignore
            op.type === 'set_selection' && ( // @ts-ignore
            op.newProperties == null || op.properties == null)) {
              continue;
            } else {
              if ( // @ts-ignore
              op.type === 'set_selection' && (op.newProperties == null || op.properties == null)) {
                continue;
              }

              e.apply(op);
            }
          }
        });
      });
      history.redos.push(batch);
      history.undos.pop();
    }
  };

  editor.isInline = function (element) {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'mention' ? true : isVoid(element);
  };

  editor.insertData = function (data) {
    var html = data.getData('text/html');
    var blob = data.items[0] && data.items[0].getAsFile();
    var slateFragment = data.getData('application/x-slate-fragment');
    var textData = data.getData('text/plain');
    var parsed = new DOMParser().parseFromString(html, 'text/html');
    var scripts = parsed.getElementsByTagName('script');

    if (scripts.length) {
      var fragmentData = JSON.parse(decodeURIComponent(window.atob(slateFragment)));
      var isList = fragmentData.filter(function (fragment) {
        return fragment.NumberedList;
      });
      fragmentData = fragmentData.map(function (fragment) {
        return updateFragment(fragment);
      });

      if (props.isoption) {
        var newFragmentData = [];

        _.map(fragmentData, function (el) {
          if (el.NumberedList) {
            _.map(el.children, function (el) {
              if (newFragmentData.length === 0) {
                newFragmentData = _.cloneDeep([el]);
              } else {
                newFragmentData[0].children = newFragmentData[0].children.concat(el.children);
              }
            });
          } else {
            if (newFragmentData.length === 0) {
              newFragmentData = _.cloneDeep([el]);
            } else {
              newFragmentData[0].children = newFragmentData[0].children.concat(el.children);
            }
          }
        });

        fragmentData = newFragmentData;
      }

      if (!isList.length) {
        Transforms.insertFragment(editor, fragmentData);
      } else {
        if (editor.selection.anchor.offset === 0 && editor.selection.anchor.path.reduce(function (reduce, path) {
          return reduce + path;
        }, 0) === 0) {
          Transforms.removeNodes(editor, editor.selection);
        }

        Transforms.insertNodes(editor, fragmentData);
      }
    } else if (blob) {
      /* eslint-disable */
      var a = new Promise(function (resolve) {
        new UploadFile({
          blob: blob,
          callBack: function callBack(e) {
            resolve(e);
          }
        });
      }).then(function (res) {
        // 插入图片内容
        Transforms.insertNodes(editor, {
          mediaType: 'IMAGE',
          character: res,
          children: [{
            text: '',
            mark: []
          }],
          type: 'mention'
        });
        var path = editor.selection.anchor.path;
        var newPath = [];
        var newPositiong = []; // 修改聚焦的坐标

        if (path.length === 4) {
          newPath = [path[0], path[1], path[2] + 1];
        } else {
          newPath = [path[0], path[1] + 1];
        } // 对左边进行赋值


        newPositiong = {
          anchor: {
            offset: 0,
            path: newPath
          },
          focus: {
            offset: 0,
            path: newPath
          }
        };
        Transforms.setSelection(editor, newPositiong);
      });
    } else {
      var fromCut = false;

      try {
        // 处理JSON错误
        fromCut = JSON.parse(textData).fromCut;
      } catch (e) {}

      if (slateFragment || fromCut) {
        var _fragmentData = fromCut ? JSON.parse(textData).fragment : JSON.parse(decodeURIComponent(window.atob(slateFragment)));

        if (props.isoption) {
          var _newFragmentData = [];

          _.map(_fragmentData, function (el) {
            if (el.NumberedList) {
              _.map(el.children, function (el) {
                if (_newFragmentData.length === 0) {
                  _newFragmentData = _.cloneDeep([el]);
                } else {
                  _newFragmentData[0].children = _newFragmentData[0].children.concat(el.children);
                }
              });
            } else {
              if (_newFragmentData.length === 0) {
                _newFragmentData = _.cloneDeep([el]);
              } else {
                _newFragmentData[0].children = _newFragmentData[0].children.concat(el.children);
              }
            }
          });

          Transforms.insertFragment(editor, _newFragmentData);
        } else {
          var isNumberedList = _fragmentData.filter(function (fragment) {
            return fragment.NumberedList;
          }).length;

          if (isNumberedList || fromCut) {
            if (editor.selection.anchor.offset === 0 && editor.selection.anchor.path.reduce(function (reduce, path) {
              return reduce + path;
            }, 0) === 0) {
              Transforms.removeNodes(editor, editor.selection);
            }

            Transforms.insertNodes(editor, _fragmentData);
          } else {
            insertData(data);
          }
        }
      } else {
        insertData(data);
      }
    }
  };

  return editor;
};

export default RichText;