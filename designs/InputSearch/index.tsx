import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Spinner from "../../components/Spinner";
import useOnClickOutside from "../../hooks/useClickOutSide";
import useDebounce from "../../hooks/useDebounce";
import { setKeyWord } from "../../redux/slices/filter";
import HorizontalProductCard from "../HorizontalProductCard";
import InputEmail from "../InputEmail";
import InputText from "../InputText";
import InputWithIcon from "../InputWithIcon";

interface IInputSearchProps {}

interface IFormValue {
  keyword?: string;
}

const InputSearch: React.FC<IInputSearchProps> = (props) => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    keyword: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IProduct[]>([]);
  const [openRecommendDialog, setOpenRecommendDialog] =
    useState<boolean>(false);

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const searchCharacters = (search: string): Promise<any[]> => {
    return fetch(
      `https://sneakery.herokuapp.com/api/products?keyword=${search}`,
      {
        method: "GET",
      }
    )
      .then((r) => r.json())
      .then((r) => r.data.products)
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          console.log("RESULT", results);
          setLoading(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      keyword: yup.string(),
    });

  const handleSubmit = (values: IFormValue) => {
    console.log(values);
  };

  const ref = useRef();

  useOnClickOutside(ref, () => setOpenRecommendDialog(false));
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <div className="w-full">
        <InputWithIcon
          icon={<MagnifyingGlassIcon width={20} height={20} color="gray" />}
          name="keyword"
          placeholder="Tìm kiếm theo tên giày, thương hiệu,..."
          onChangeValue={(text) => {
            setSearchTerm(text as string);
          }}
          onFocus={() => {
            setOpenRecommendDialog(true);
          }}
        />
        {openRecommendDialog && (
          <div
            className={`w-[410px] mt-2 bg-white shadow-lg border border-gray-200 h-fit z-20 ${
              searchTerm === "" && "hidden"
            }  pb-2 absolute rounded-xl flex flex-col`}
            ref={ref as any}
          >
            {loading ? (
              <div className="w-full h-full mx-auto justify-center flex items-center py-10">
                <Spinner size={30} />
              </div>
            ) : (
              <div className="flex flex-col gap-y-2 pb-2">
                {results.map((item, index) => {
                  if (index <= 3)
                    return (
                      <HorizontalProductCard
                        product={item as any}
                        key={index.toString()}
                      />
                    );
                })}
                {searchTerm !== "" && loading === false && (
                  <button
                    className="mx-auto mt-2 rounded-full text-blue-900 bg-blue-200 text-xs px-4 py-2 hover:opacity-80"
                    onClick={() => {
                      if (searchTerm !== "") {
                        dispatch(setKeyWord(searchTerm));
                      } else {
                        dispatch(setKeyWord(null));
                      }
                      router.push("/category");
                    }}
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Formik>
  );
};

export default InputSearch;
