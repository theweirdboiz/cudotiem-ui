import React, { useEffect, useState } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "~/components";
import { status } from "~/config";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";

import { categoriesData } from "~/fake-data/categories";
import { CategoryType } from "~/types/CategoryType";

type Props = {};

const CategoryManage = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setTimeout(() => {}, 1000);
      setCategories(categoriesData as any);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <DashboardHeading>Categories</DashboardHeading>
      <div className="flex-center justify-end my-5">
        <Button>Create category</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category?.id}>
                <td>{category?.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {category.status === 1 && (
                    <LabelStatus type={status.APPROVED}>Approved</LabelStatus>
                  )}
                  {category.status === 2 && (
                    <LabelStatus type={status.PENDING}>Pending</LabelStatus>
                  )}
                  {category.status === 3 && (
                    <LabelStatus type={status.REJECTED}>Rejected</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex-center gap-x-2.5">
                    <ActionView />
                    <ActionEdit />
                    <ActionDelete />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
