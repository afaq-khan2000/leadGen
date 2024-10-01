const ENV = require("../../Helper/ENV/environment");
const { hashString, makeUserName } = require("../../Helper/helper");
const DB = require("../mdbConnection");
const adminEmail = ENV.ADMIN_EMAIL;
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Master DB Seeders
exports.mdbSeeders = async () => {
  await seedRoles(); // seed roles
  await seedRolePermissions(); // seed role permissions
  await seedSuperUser(); // seed super user
  //await seedFreePackagePlan(); // Seed Free Plan
  await seedPackages(); // Seed Free Plan
};

// seed super user object
const seedSuperUser = async () => {
  try {
    const superAdminObject = await DB.UserModel.findOne({
      where: {
        role_id: 1,
      },
    });
    if (superAdminObject) return;

    const superAdmin = await DB.UserModel.create({
      first_name: "Super",
      last_name: "User",
      username: makeUserName(adminEmail),
      email: adminEmail,
      password: hashString("12345678"),
      is_active: true,
      email_verified: true,
      email_verified_at: new Date(),
      is_agree_terms: true,
      avatar: ENV.DEFAULT_AVATAR,
      role_id: 1,
    });
  } catch (error) {
    console.log("seedSuperUser Error: ", error);
  }
};

// seed role objects
const seedRoles = async () => {
  try {
    const countRoles = await DB.RoleModel.count();
    if (countRoles > 0) return;

    await DB.RoleModel.bulkCreate([
      { display_name: "Super User", role_name: "super_user" },
      { display_name: "SaaS User", role_name: "saas_user" },
      { display_name: "SaaS Employee", role_name: "saas_employee" },
      { display_name: "Support Employee", role_name: "support_employee" },
    ]);
  } catch (error) {
    console.log("seedRoles Error: ", error);
  }
};

// seed permission objects
const seedRolePermissions = async () => {
  try {
    // role objects
    const superUser = await DB.RoleModel.findOne({
      where: { role_name: "super_user" },
    });
    const saasUser = await DB.RoleModel.findOne({
      where: { role_name: "saas_user" },
    });
    const saasEmployee = await DB.RoleModel.findOne({
      where: { role_name: "saas_employee" },
    });

    // Role ids
    const { id: superUserRoleId } = superUser;
    const { id: saasUserRoleId } = saasUser;
    const { id: saasEmployeeRoleId } = saasEmployee;

    // user role ids
    const superUserPermission = await DB.RolePermissionModel.findOne({
      where: { role_id: superUserRoleId },
    });
    const saasUserPermission = await DB.RolePermissionModel.findOne({
      where: { role_id: saasUserRoleId },
    });
    const saasEmployeePermission = await DB.RolePermissionModel.findOne({
      where: { role_id: saasEmployeeRoleId },
    });

    // seed super user permissions
    if (!superUserPermission) {
      await DB.RolePermissionModel.create({
        role_id: superUserRoleId,
        url_path: "all_super_user_paths",
      });
    }

    // seed saas user permissions
    if (!saasUserPermission) {
      await DB.RolePermissionModel.create({
        role_id: saasUserRoleId,
        url_path: "all_saas_user_paths",
      });
    }

    // seed saas employee permissions
    if (!saasEmployeePermission) {
      await DB.RolePermissionModel.create({
        role_id: saasEmployeeRoleId,
        url_path: "all_saas_user_paths",
      });
    }
  } catch (error) {
    console.log("seedRolePermissions Error: ", error);
  }
};
const createCustomPrice = async (productId, amount, currency = "usd", time_interval) => {
  // List existing prices for the product
  const prices = await stripe.prices.list({
    product: productId,
    active: true, // Only consider active prices
  });

  // Check if a price with the same amount, currency, and interval already exists
  const existingPrice = prices.data.find(price =>
    price.unit_amount === amount &&
    price.currency === currency &&
    price.recurring?.interval === time_interval
  );

  if (existingPrice) {
    return existingPrice.id; // Return the existing price ID
  }

  // If no matching price is found, create a new one
  const price = await stripe.prices.create({
    unit_amount: amount,
    currency: currency,
    recurring: {
      interval: time_interval,
    },
    product: productId,
  });

  return price.id; // Return the new price ID
};
const seedPackages = async () => {
  try {
    const countPackages = await DB.PackageModel.count();
    if (countPackages > 0) {
      let findFreePackage = await DB.PackageModel.findOne({
        where: { title: "Free" },
      });
      if (findFreePackage) return;
    }

    // onst featureEntries = [
    //   { key: "employees", value: employees, type: "numeric" },
    //   { key: "leads", value: leads, type: "numeric" },
    //   { key: "projects", value: projects, type: "numeric" },
    //   {
    //     key: "document_characters",
    //     value: document_characters,
    //     type: "numeric",
    //   },
    //   { key: "storage", value: storage, type: "numeric" },
    //   { key: "user_stories", value: user_stories, type: "numeric" },
    //   { key: "support", value: support, type: "numeric" },
    //   { key: "monthly_price", value: monthly_price, type: "numeric" },
    //   { key: "yearly_price", value: yearly_price, type: "numeric" },
    // ];

    const standard_price_month = 500;//$5
    const standard_price_year = 5400;//10% --> $60;
    const premium_price_month = 1000;
    const premium_price_year = 10800;//10% --> $120
    const allProducts = await stripe.products.list();
    const stripeProduct = allProducts.data.find(
      (product) => product.name === process.env.STRIPE_PRODUCT_NAME//"ontezo-test"
    );
    const standard_monthly_price_id = await createCustomPrice(stripeProduct.id, standard_price_month, "usd", "month");
    const standard_yearly_price_id = await createCustomPrice(stripeProduct.id, standard_price_year, "usd", "year");
    const premium_monthly_price_id = await createCustomPrice(stripeProduct.id, premium_price_month, "usd", "month");
    const premium_yearly_price_id = await createCustomPrice(stripeProduct.id, premium_price_year, "usd", "year");



    const packages = [
      {
        title: "Free",
        plan_category: "public",
        monthly_price: 0,
        annual_price: 0,
        annual_is_discounted: 0,
        annual_discount_type: null,
        annual_discount: null,
        client_ids: [],
        desc: "Try Free Plan",
        is_monthly: true,
        features: [
          { title: "Up to 10 employees", key: "employees", value: "10", type: "numeric" },
          { title: "3 projects", key: "projects", value: "3", type: "numeric" },
          { title: "Upto 20 leads", key: "leads", value: "20", type: "numeric" },
          {
            title: "Project requirement document",
            key: "document_characters",
            value: "5000",
            type: "numeric",
            desc:"1500 words limit (5000 characters)"
          },
          {
            title: "Project requirement document",
            key: "document_words",
            value: "1500",
            type: "numeric",
            desc:"1500 words limit (5000 characters)"
          },
          { title: "1 GB Storage", key: "storage", value: "1024", type: "numeric" },
          {
            title: "75 AI User Stories Per Month",
            key: "user_stories",
            value: "75",
            type: "numeric",
            desc: "Renew every month"
          },
          { title: "Employee Performance Report", key: "employee_report", value: "true", type: "numeric" },
          { title: "Dynamic board with access control", key: "dynamic_board", value: "true", type: "numeric",desc: "Track and manage individual task progress for team members with different roles" },
          {
            title: "No of lists 10",
            key: "no_of_lists",
            value: "10",
            type: "numeric",
          },
          { title: "Support", key: "support", value: "false", type: "numeric" },
          // {
          //   title: "Yearly Price",
          //   key: "yearly_price",
          //   value: "0",
          //   type: "numeric",
          // },
        ],
      },
      {
        title: "Standard",
        plan_category: "public",
        monthly_price: standard_price_month,
        annual_price: standard_price_year,
        annual_is_discounted: 1,
        annual_discount_type: "percentage",
        annual_discount: 10,
        client_ids: [],
        desc: "Starter Plan",
        is_monthly: true,
        stripe_monthly_price_id: standard_monthly_price_id,
        stripe_yearly_price_id: standard_yearly_price_id,
        features: [
          { title: "Upto 25 employees", key: "employees", value: "25", type: "numeric",desc: "Employees can be topup when the current limit is reached" },
          { title: "15 projects", key: "projects", value: "15", type: "numeric" },

          { title: "Upto 100 leads", key: "leads", value: "100", type: "numeric" },
          {
            title: "200 AI User Stories Per Month",
            key: "user_stories",
            value: "200",
            type: "numeric",
            desc: "Renew every month"
          },
          {
            title: "Project requirement document",
            key: "document_characters",
            value: "20000",
            type: "numeric",
            desc:"4000 words limit (20000 characters)"
          },
          {
            title: "Project requirement document",
            key: "document_words",
            value: "4000",
            type: "numeric",
            desc:"4000 words limit (20000 characters)"
          },
          { title: "10 GB Storage", key: "storage", value: "10240", type: "numeric" },
          { title: "Employee Performance Report", key: "employee_report", value: "true", type: "numeric" },
          { title: "Projects Detailed Analytics", key: "project_analytics", value: "true", type: "numeric",desc: "Profit & Loss"},
          { title: "Dynamic board with access control", key: "dynamic_board", value: "true", type: "numeric",desc: "Track and manage individual task progress for team members with different roles" },
          {
            title: "No of lists 15",
            key: "no_of_lists",
            value: "15",
            type: "numeric",
          },
          { title: "24/7 Support", key: "support", value: "true", type: "numeric" },
        ],
      },
      {
        title: "Premium",
        plan_category: "public",
        desc: "Professional Plan",
        is_monthly: true,
        monthly_price: premium_price_month,
        annual_price: premium_price_year,
        annual_is_discounted: 1,
        annual_discount_type: "percentage",
        annual_discount: 10,
        client_ids: [],
        stripe_monthly_price_id: premium_monthly_price_id,
        stripe_yearly_price_id: premium_yearly_price_id,
        features: [
          { title: "Upto 50 employees", key: "employees", value: "50", type: "numeric",desc: "Employees can be topup when the current limit is reached" },
          { title: "Upto 200 leads", key: "leads", value: "200", type: "numeric" },
          { title: "Upto 30 projects", key: "projects", value: "30", type: "numeric" },
          {
            title: "Project requirement document",
            key: "document_characters",
            value: "50000",
            type: "numeric",
            desc:"10000 words limit (50000 characters)"
          },
          {
            title: "Project requirement document",
            key: "document_words",
            value: "10000",
            type: "numeric",
            desc:"10000 words limit (50000 characters)"
          },
          { title: "50 GB Storage", key: "storage", value: "51200", type: "numeric" },
          {
            title: "Unlimited AI user stories",
            key: "user_stories",
            value: "500",
            type: "numeric",
            desc: "(Fair usage policy) Renew every month"
          },
          { title: "Employee Performance Reports", key: "employee_performance_report", value: "true", type: "numeric" },
          { title: "Projects Detailed Analytics", key: "project_analytics", value: "true", type: "numeric",desc: "In-depth insights into your project's financial health with our detailed Profit & Loss analytics" },
          { title: "Dynamic board with access control", key: "dynamic_board", value: "true", type: "numeric",desc: "Track and manage individual task progress for team members with different roles" },
          {
            title: "No of lists 20",
            key: "no_of_lists",
            value: "20",
            type: "numeric",
          },
          { title: "Priority Support", key: "support", value: "true", type: "numeric" },
        ],
      },

    ];

    await DB.PackageModel.destroy({ where: {} });
    await DB.FeatureModel.destroy({ where: {} });
    await DB.PackageFeatureModel.destroy({ where: {} });

    for (let package of packages) {
      const { title, price, desc, is_monthly, features,
        plan_category,
        monthly_price,
        annual_price,
        annual_is_discounted,
        annual_discount_type,
        annual_discount,
        client_ids,
        stripe_monthly_price_id,
        stripe_yearly_price_id
         } = package;
      const createdPackage = await DB.PackageModel.create({
        title, price, desc, is_monthly,plan_category,
        monthly_price:monthly_price/100,
        annual_price:annual_price/100,
        annual_is_discounted,
        annual_discount_type,
        annual_discount,
        client_ids,
        stripe_monthly_plan_id: stripe_monthly_price_id || null,
        stripe_yearly_plan_id: stripe_yearly_price_id || null
      });

      const packageId = createdPackage.id;

      for (let feature of features) {
        const { title, key, value, type ,desc} = feature;
        const createdFeature = await DB.FeatureModel.create({
          title,
          type,
          desc:desc || "",
          key,
          value,
        });

        await DB.PackageFeatureModel.create({
          package_id: packageId,
          feature_id: createdFeature.id,
        });
      }
    }
  } catch (error) {
    console.log("seedPackages Error: ", error);
  }
};

// seed Free Package Plan
// const seedFreePackagePlan = async () => {
//   try {
//     const countPlans = await DB.PackagePlanModel.count();
//     if (countPlans > 0) {
//       let findFreePlan = await DB.PackagePlanModel.findOne({
//         where: { id: 1, is_free: true },
//       });
//       if (findFreePlan) return;
//     }
//
//     const packages = [
//       {
//         heading: "Try Free Plan",
//         monthly_price: 0,
//         is_free: true,
//         short_description: "Try Free Plan",
//         is_monthly: true,
//         employees: 5,
//         projects: 5,
//         tasks: 5,
//         leads: 5,
//         job_queues: 5,
//         roles: 5,
//       },
//       {
//         heading: "Starter Plan",
//         monthly_price: 10,
//         is_free: false,
//         short_description: "Starter Plan",
//         is_monthly: true,
//         employees: 10,
//         projects: 10,
//         tasks: 10,
//         leads: 10,
//         job_queues: 10,
//         roles: 10,
//       },
//       {
//         heading: "Professional Plan",
//         monthly_price: 20,
//         is_free: false,
//         short_description: "Professional Plan",
//         is_monthly: true,
//         employees: 20,
//         projects: 20,
//         tasks: 20,
//         leads: 20,
//         job_queues: 20,
//         roles: 20,
//       },
//       {
//         heading: "Enterprise Plan",
//         monthly_price: 30,
//         is_free: false,
//         short_description: "Enterprise Plan",
//         is_monthly: true,
//         employees: 30,
//         projects: 30,
//         tasks: 30,
//         leads: 30,
//         job_queues: 30,
//         roles: 30,
//       },
//     ];
//
//     await DB.PackagePlanModel.destroy({ where: {} });
//
//     for (let package of packages) {
//       const { heading, monthly_price, is_free, short_description, is_monthly, employees, projects, tasks, leads, job_queues, roles } = package;
//       const packagePlan = await DB.PackagePlanModel.create({
//         heading,
//         monthly_price,
//         is_free,
//         short_description,
//         is_monthly,
//         employees,
//         projects,
//         tasks,
//         leads,
//         job_queues,
//         roles,
//       });
//
//       const { id: packagePlanId, heading: packagePlanHeading } = packagePlan;
//
//       if (packagePlanHeading === "Try Free Plan") {
//         await DB.PlanFeatureModel.bulkCreate([
//           { package_id: packagePlanId, feature: "5 Employees" },
//           { package_id: packagePlanId, feature: "5 Projects" },
//           { package_id: packagePlanId, feature: "5 Tasks" },
//           { package_id: packagePlanId, feature: "5 Leads" },
//           { package_id: packagePlanId, feature: "5 Job Queues" },
//           { package_id: packagePlanId, feature: "5 Roles" },
//         ]);
//       } else if (packagePlanHeading === "Starter Plan") {
//         await DB.PlanFeatureModel.bulkCreate([
//           { package_id: packagePlanId, feature: "10 Employees" },
//           { package_id: packagePlanId, feature: "10 Projects" },
//           { package_id: packagePlanId, feature: "10 Tasks" },
//           { package_id: packagePlanId, feature: "10 Leads" },
//           { package_id: packagePlanId, feature: "10 Job Queues" },
//           { package_id: packagePlanId, feature: "10 Roles" },
//         ]);
//       } else if (packagePlanHeading === "Professional Plan") {
//         await DB.PlanFeatureModel.bulkCreate([
//           { package_id: packagePlanId, feature: "20 Employees" },
//           { package_id: packagePlanId, feature: "20 Projects" },
//           { package_id: packagePlanId, feature: "20 Tasks" },
//           { package_id: packagePlanId, feature: "20 Leads" },
//           { package_id: packagePlanId, feature: "20 Job Queues" },
//           { package_id: packagePlanId, feature: "20 Roles" },
//         ]);
//       } else if (packagePlanHeading === "Enterprise Plan") {
//         await DB.PlanFeatureModel.bulkCreate([
//           { package_id: packagePlanId, feature: "30 Employees" },
//           { package_id: packagePlanId, feature: "30 Projects" },
//           { package_id: packagePlanId, feature: "30 Tasks" },
//           { package_id: packagePlanId, feature: "30 Leads" },
//           { package_id: packagePlanId, feature: "30 Job Queues" },
//           { package_id: packagePlanId, feature: "30 Roles" },
//         ]);
//       }
//     }
//   } catch (error) {
//     console.log("seedInvoiceTemplates Error: ", error);
//   }
// };
