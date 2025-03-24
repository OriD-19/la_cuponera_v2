import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','firstName','lastName','password','createdAt','updatedAt']);

export const EnterpriseScalarFieldEnumSchema = z.enum(['id','description','commissionPercentage','enterpriseCode','location','phone','userId','categoryId']);

export const ClientScalarFieldEnumSchema = z.enum(['id','phone','DUI','userId']);

export const EmployeeScalarFieldEnumSchema = z.enum(['id','phone','userId','enterpriseId']);

export const AdminScalarFieldEnumSchema = z.enum(['id','phone','userId']);

export const OfferScalarFieldEnumSchema = z.enum(['id','title','description','originalPrice','discountPrice','validFrom','validUntil','quantityLimit','sold','createdAt','updatedAt','offerState','approvedAt','offerRejectedReason','enterpriseId']);

export const CouponScalarFieldEnumSchema = z.enum(['id','code','createdAt','updatedAt','couponState','offerId','clientId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const OfferStateSchema = z.enum(['PENDING','APPROVED','ACTIVE','EXPIRED','REJECTED','DISCARDED']);

export type OfferStateType = `${z.infer<typeof OfferStateSchema>}`

export const CouponStateSchema = z.enum(['VALID','USED','EXPIRED']);

export type CouponStateType = `${z.infer<typeof CouponStateSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// CATEGORY PARTIAL SCHEMA
/////////////////////////////////////////

export const CategoryPartialSchema = CategorySchema.partial()

export type CategoryPartial = z.infer<typeof CategoryPartialSchema>

// CATEGORY RELATION SCHEMA
//------------------------------------------------------

export type CategoryRelations = {
  Enterprise: EnterpriseWithRelations[];
};

export type CategoryWithRelations = z.infer<typeof CategorySchema> & CategoryRelations

export const CategoryWithRelationsSchema: z.ZodType<CategoryWithRelations> = CategorySchema.merge(z.object({
  Enterprise: z.lazy(() => EnterpriseWithRelationsSchema).array(),
}))

// CATEGORY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CategoryPartialRelations = {
  Enterprise?: EnterprisePartialWithRelations[];
};

export type CategoryPartialWithRelations = z.infer<typeof CategoryPartialSchema> & CategoryPartialRelations

export const CategoryPartialWithRelationsSchema: z.ZodType<CategoryPartialWithRelations> = CategoryPartialSchema.merge(z.object({
  Enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema).array(),
})).partial()

export type CategoryWithPartialRelations = z.infer<typeof CategorySchema> & CategoryPartialRelations

export const CategoryWithPartialRelationsSchema: z.ZodType<CategoryWithPartialRelations> = CategorySchema.merge(z.object({
  Enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  Enterprise?: EnterpriseWithRelations | null;
  Client?: ClientWithRelations | null;
  Employee?: EmployeeWithRelations | null;
  Admin?: AdminWithRelations | null;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  Enterprise: z.lazy(() => EnterpriseWithRelationsSchema).nullable(),
  Client: z.lazy(() => ClientWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeeWithRelationsSchema).nullable(),
  Admin: z.lazy(() => AdminWithRelationsSchema).nullable(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  Enterprise?: EnterprisePartialWithRelations | null;
  Client?: ClientPartialWithRelations | null;
  Employee?: EmployeePartialWithRelations | null;
  Admin?: AdminPartialWithRelations | null;
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  Enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema).nullable(),
  Client: z.lazy(() => ClientPartialWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeePartialWithRelationsSchema).nullable(),
  Admin: z.lazy(() => AdminPartialWithRelationsSchema).nullable(),
})).partial()

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  Enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema).nullable(),
  Client: z.lazy(() => ClientPartialWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeePartialWithRelationsSchema).nullable(),
  Admin: z.lazy(() => AdminPartialWithRelationsSchema).nullable(),
}).partial())

/////////////////////////////////////////
// ENTERPRISE SCHEMA
/////////////////////////////////////////

export const EnterpriseSchema = z.object({
  id: z.number().int(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  categoryId: z.number().int().nullable(),
})

export type Enterprise = z.infer<typeof EnterpriseSchema>

/////////////////////////////////////////
// ENTERPRISE PARTIAL SCHEMA
/////////////////////////////////////////

export const EnterprisePartialSchema = EnterpriseSchema.partial()

export type EnterprisePartial = z.infer<typeof EnterprisePartialSchema>

// ENTERPRISE RELATION SCHEMA
//------------------------------------------------------

export type EnterpriseRelations = {
  user: User;
  Offer: Offer[];
  Employee: Employee[];
  Category?: Category | null;
};

export type EnterpriseWithRelations = z.infer<typeof EnterpriseSchema> & EnterpriseRelations

export const EnterpriseWithRelationsSchema: z.ZodType<EnterpriseWithRelations> = EnterpriseSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  Offer: z.lazy(() => OfferWithRelationsSchema).array(),
  Employee: z.lazy(() => EmployeeWithRelationsSchema).array(),
  Category: z.lazy(() => CategoryWithRelationsSchema).nullable(),
}))

// ENTERPRISE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type EnterprisePartialRelations = {
  user?: UserPartialWithRelations;
  Offer?: OfferPartialWithRelations[];
  Employee?: EmployeePartialWithRelations[];
  Category?: CategoryPartialWithRelations | null;
};

export type EnterprisePartialWithRelations = z.infer<typeof EnterprisePartialSchema> & EnterprisePartialRelations

export const EnterprisePartialWithRelationsSchema: z.ZodType<EnterprisePartialWithRelations> = EnterprisePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  Offer: z.lazy(() => OfferPartialWithRelationsSchema).array(),
  Employee: z.lazy(() => EmployeePartialWithRelationsSchema).array(),
  Category: z.lazy(() => CategoryPartialWithRelationsSchema).nullable(),
})).partial()

export type EnterpriseWithPartialRelations = z.infer<typeof EnterpriseSchema> & EnterprisePartialRelations

export const EnterpriseWithPartialRelationsSchema: z.ZodType<EnterpriseWithPartialRelations> = EnterpriseSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  Offer: z.lazy(() => OfferPartialWithRelationsSchema).array(),
  Employee: z.lazy(() => EmployeePartialWithRelationsSchema).array(),
  Category: z.lazy(() => CategoryPartialWithRelationsSchema).nullable(),
}).partial())

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.number().int(),
  phone: z.string(),
  DUI: z.string(),
  userId: z.number().int(),
})

export type Client = z.infer<typeof ClientSchema>

/////////////////////////////////////////
// CLIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const ClientPartialSchema = ClientSchema.partial()

export type ClientPartial = z.infer<typeof ClientPartialSchema>

// CLIENT RELATION SCHEMA
//------------------------------------------------------

export type ClientRelations = {
  Coupons: CouponWithRelations[];
  user: UserWithRelations;
};

export type ClientWithRelations = z.infer<typeof ClientSchema> & ClientRelations

export const ClientWithRelationsSchema: z.ZodType<ClientWithRelations> = ClientSchema.merge(z.object({
  Coupons: z.lazy(() => CouponWithRelationsSchema).array(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

// CLIENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ClientPartialRelations = {
  Coupons?: CouponPartialWithRelations[];
  user?: UserPartialWithRelations;
};

export type ClientPartialWithRelations = z.infer<typeof ClientPartialSchema> & ClientPartialRelations

export const ClientPartialWithRelationsSchema: z.ZodType<ClientPartialWithRelations> = ClientPartialSchema.merge(z.object({
  Coupons: z.lazy(() => CouponPartialWithRelationsSchema).array(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type ClientWithPartialRelations = z.infer<typeof ClientSchema> & ClientPartialRelations

export const ClientWithPartialRelationsSchema: z.ZodType<ClientWithPartialRelations> = ClientSchema.merge(z.object({
  Coupons: z.lazy(() => CouponPartialWithRelationsSchema).array(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// EMPLOYEE SCHEMA
/////////////////////////////////////////

export const EmployeeSchema = z.object({
  id: z.number().int(),
  phone: z.string().nullable(),
  userId: z.number().int(),
  enterpriseId: z.number().int(),
})

export type Employee = z.infer<typeof EmployeeSchema>

/////////////////////////////////////////
// EMPLOYEE PARTIAL SCHEMA
/////////////////////////////////////////

export const EmployeePartialSchema = EmployeeSchema.partial()

export type EmployeePartial = z.infer<typeof EmployeePartialSchema>

// EMPLOYEE RELATION SCHEMA
//------------------------------------------------------

export type EmployeeRelations = {
  user: UserWithRelations;
  enterprise: EnterpriseWithRelations;
};

export type EmployeeWithRelations = z.infer<typeof EmployeeSchema> & EmployeeRelations

export const EmployeeWithRelationsSchema: z.ZodType<EmployeeWithRelations> = EmployeeSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  enterprise: z.lazy(() => EnterpriseWithRelationsSchema),
}))

// EMPLOYEE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type EmployeePartialRelations = {
  user?: UserPartialWithRelations;
  enterprise?: EnterprisePartialWithRelations;
};

export type EmployeePartialWithRelations = z.infer<typeof EmployeePartialSchema> & EmployeePartialRelations

export const EmployeePartialWithRelationsSchema: z.ZodType<EmployeePartialWithRelations> = EmployeePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema),
})).partial()

export type EmployeeWithPartialRelations = z.infer<typeof EmployeeSchema> & EmployeePartialRelations

export const EmployeeWithPartialRelationsSchema: z.ZodType<EmployeeWithPartialRelations> = EmployeeSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ADMIN SCHEMA
/////////////////////////////////////////

export const AdminSchema = z.object({
  id: z.number().int(),
  phone: z.string(),
  userId: z.number().int(),
})

export type Admin = z.infer<typeof AdminSchema>

/////////////////////////////////////////
// ADMIN PARTIAL SCHEMA
/////////////////////////////////////////

export const AdminPartialSchema = AdminSchema.partial()

export type AdminPartial = z.infer<typeof AdminPartialSchema>

// ADMIN RELATION SCHEMA
//------------------------------------------------------

export type AdminRelations = {
  user: UserWithRelations;
};

export type AdminWithRelations = z.infer<typeof AdminSchema> & AdminRelations

export const AdminWithRelationsSchema: z.ZodType<AdminWithRelations> = AdminSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ADMIN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AdminPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AdminPartialWithRelations = z.infer<typeof AdminPartialSchema> & AdminPartialRelations

export const AdminPartialWithRelationsSchema: z.ZodType<AdminPartialWithRelations> = AdminPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type AdminWithPartialRelations = z.infer<typeof AdminSchema> & AdminPartialRelations

export const AdminWithPartialRelationsSchema: z.ZodType<AdminWithPartialRelations> = AdminSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// OFFER SCHEMA
/////////////////////////////////////////

export const OfferSchema = z.object({
  offerState: OfferStateSchema.openapi({ description: "The state of the offer", example: "PENDING" }),
  id: z.number().int().openapi({ description: "The ID of the offer", example: 1 }),
  title: z.string().openapi({ description: "The title of the offer", example: "Offer Title" }),
  description: z.string().openapi({ description: "The description of the offer", example: "Offer Description" }),
  originalPrice: z.number().openapi({ description: "The original price of the offer", example: 100 }),
  discountPrice: z.number().openapi({ description: "The discount price of the offer", example: 50 }),
  validFrom: z.coerce.date().openapi({ description: "The date when the offer is valid from", example: "2021-10-01T00:00:00.000Z" }),
  validUntil: z.coerce.date().openapi({ description: "The date when the offer is valid until", example: "2021-10-01T00:00:00.000Z" }),
  quantityLimit: z.number().int().nullable().openapi({ description: "The quantity limit of the offer", example: 100 }),
  sold: z.number().int().nullable().openapi({ description: "The quantity sold of the offer", example: 50 }),
  createdAt: z.coerce.date().openapi({ description: "The date when the offer was created", example: "2021-10-01T00:00:00.000Z" }),
  updatedAt: z.coerce.date().openapi({ description: "The date when the offer was last updated", example: "2021-10-01T00:00:00.000Z" }),
  approvedAt: z.coerce.date().nullable().openapi({ description: "The date when the offer was approved", example: "2021-10-01T00:00:00.000Z" }),
  offerRejectedReason: z.string().nullable().openapi({ description: "The reason why the offer was rejected", example: "Offer Rejected Reason" }),
  enterpriseId: z.number().int().openapi({ description: "The ID of the enterprise associated with the offer", example: 1 }),
})

export type Offer = z.infer<typeof OfferSchema>

/////////////////////////////////////////
// OFFER PARTIAL SCHEMA
/////////////////////////////////////////

export const OfferPartialSchema = OfferSchema.partial()

export type OfferPartial = z.infer<typeof OfferPartialSchema>

// OFFER RELATION SCHEMA
//------------------------------------------------------

export type OfferRelations = {
  enterprise: Enterprise;
  Coupon: Coupon[];
};

export type OfferWithRelations = z.infer<typeof OfferSchema> & OfferRelations

export const OfferWithRelationsSchema: z.ZodType<OfferWithRelations> = OfferSchema.merge(z.object({
  enterprise: z.lazy(() => EnterpriseWithRelationsSchema),
  Coupon: z.lazy(() => CouponWithRelationsSchema).array(),
}))

// OFFER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type OfferPartialRelations = {
  enterprise?: EnterprisePartialWithRelations;
  Coupon?: CouponPartialWithRelations[];
};

export type OfferPartialWithRelations = z.infer<typeof OfferPartialSchema> & OfferPartialRelations

export const OfferPartialWithRelationsSchema: z.ZodType<OfferPartialWithRelations> = OfferPartialSchema.merge(z.object({
  enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema),
  Coupon: z.lazy(() => CouponPartialWithRelationsSchema).array(),
})).partial()

export type OfferWithPartialRelations = z.infer<typeof OfferSchema> & OfferPartialRelations

export const OfferWithPartialRelationsSchema: z.ZodType<OfferWithPartialRelations> = OfferSchema.merge(z.object({
  enterprise: z.lazy(() => EnterprisePartialWithRelationsSchema),
  Coupon: z.lazy(() => CouponPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// COUPON SCHEMA
/////////////////////////////////////////

export const CouponSchema = z.object({
  couponState: CouponStateSchema,
  id: z.number().int().openapi({ description: "The ID of the coupon", example: 1 }),
  code: z.string().openapi({ description: "The code of the coupon", example: "ABC1230000000" }),
  createdAt: z.coerce.date().openapi({ description: "The date when the coupon was created", example: "2021-10-01T00:00:00.000Z" }),
  updatedAt: z.coerce.date().openapi({ description: "The date when the coupon was last updated", example: "2021-10-01T00:00:00.000Z" }),
  offerId: z.number().int().openapi({ description: "The ID of the offer associated with the coupon", example: 1 }),
  clientId: z.number().int().openapi({ description: "The ID of the client who owns the coupon", example: 1 }),
})

export type Coupon = z.infer<typeof CouponSchema>

/////////////////////////////////////////
// COUPON PARTIAL SCHEMA
/////////////////////////////////////////

export const CouponPartialSchema = CouponSchema.partial()

export type CouponPartial = z.infer<typeof CouponPartialSchema>

// COUPON RELATION SCHEMA
//------------------------------------------------------

export type CouponRelations = {
  offerDetails: Offer;
  client: Client;
};

export type CouponWithRelations = z.infer<typeof CouponSchema> & CouponRelations

export const CouponWithRelationsSchema: z.ZodType<CouponWithRelations> = CouponSchema.merge(z.object({
  offerDetails: z.lazy(() => OfferWithRelationsSchema),
  client: z.lazy(() => ClientWithRelationsSchema),
}))

// COUPON PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CouponPartialRelations = {
  offerDetails?: OfferPartialWithRelations;
  client?: ClientPartialWithRelations;
};

export type CouponPartialWithRelations = z.infer<typeof CouponPartialSchema> & CouponPartialRelations

export const CouponPartialWithRelationsSchema: z.ZodType<CouponPartialWithRelations> = CouponPartialSchema.merge(z.object({
  offerDetails: z.lazy(() => OfferPartialWithRelationsSchema),
  client: z.lazy(() => ClientPartialWithRelationsSchema),
})).partial()

export type CouponWithPartialRelations = z.infer<typeof CouponSchema> & CouponPartialRelations

export const CouponWithPartialRelationsSchema: z.ZodType<CouponWithPartialRelations> = CouponSchema.merge(z.object({
  offerDetails: z.lazy(() => OfferPartialWithRelationsSchema),
  client: z.lazy(() => ClientPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  Enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  Enterprise: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
  Client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  Employee: z.union([z.boolean(),z.lazy(() => EmployeeArgsSchema)]).optional(),
  Admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
  Client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  Employee: z.union([z.boolean(),z.lazy(() => EmployeeArgsSchema)]).optional(),
  Admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

// ENTERPRISE
//------------------------------------------------------

export const EnterpriseIncludeSchema: z.ZodType<Prisma.EnterpriseInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Offer: z.union([z.boolean(),z.lazy(() => OfferFindManyArgsSchema)]).optional(),
  Employee: z.union([z.boolean(),z.lazy(() => EmployeeFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EnterpriseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EnterpriseArgsSchema: z.ZodType<Prisma.EnterpriseDefaultArgs> = z.object({
  select: z.lazy(() => EnterpriseSelectSchema).optional(),
  include: z.lazy(() => EnterpriseIncludeSchema).optional(),
}).strict();

export const EnterpriseCountOutputTypeArgsSchema: z.ZodType<Prisma.EnterpriseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EnterpriseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EnterpriseCountOutputTypeSelectSchema: z.ZodType<Prisma.EnterpriseCountOutputTypeSelect> = z.object({
  Offer: z.boolean().optional(),
  Employee: z.boolean().optional(),
}).strict();

export const EnterpriseSelectSchema: z.ZodType<Prisma.EnterpriseSelect> = z.object({
  id: z.boolean().optional(),
  description: z.boolean().optional(),
  commissionPercentage: z.boolean().optional(),
  enterpriseCode: z.boolean().optional(),
  location: z.boolean().optional(),
  phone: z.boolean().optional(),
  userId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Offer: z.union([z.boolean(),z.lazy(() => OfferFindManyArgsSchema)]).optional(),
  Employee: z.union([z.boolean(),z.lazy(() => EmployeeFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EnterpriseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CLIENT
//------------------------------------------------------

export const ClientIncludeSchema: z.ZodType<Prisma.ClientInclude> = z.object({
  Coupons: z.union([z.boolean(),z.lazy(() => CouponFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ClientArgsSchema: z.ZodType<Prisma.ClientDefaultArgs> = z.object({
  select: z.lazy(() => ClientSelectSchema).optional(),
  include: z.lazy(() => ClientIncludeSchema).optional(),
}).strict();

export const ClientCountOutputTypeArgsSchema: z.ZodType<Prisma.ClientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ClientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ClientCountOutputTypeSelectSchema: z.ZodType<Prisma.ClientCountOutputTypeSelect> = z.object({
  Coupons: z.boolean().optional(),
}).strict();

export const ClientSelectSchema: z.ZodType<Prisma.ClientSelect> = z.object({
  id: z.boolean().optional(),
  phone: z.boolean().optional(),
  DUI: z.boolean().optional(),
  userId: z.boolean().optional(),
  Coupons: z.union([z.boolean(),z.lazy(() => CouponFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMPLOYEE
//------------------------------------------------------

export const EmployeeIncludeSchema: z.ZodType<Prisma.EmployeeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
}).strict()

export const EmployeeArgsSchema: z.ZodType<Prisma.EmployeeDefaultArgs> = z.object({
  select: z.lazy(() => EmployeeSelectSchema).optional(),
  include: z.lazy(() => EmployeeIncludeSchema).optional(),
}).strict();

export const EmployeeSelectSchema: z.ZodType<Prisma.EmployeeSelect> = z.object({
  id: z.boolean().optional(),
  phone: z.boolean().optional(),
  userId: z.boolean().optional(),
  enterpriseId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
}).strict()

// ADMIN
//------------------------------------------------------

export const AdminIncludeSchema: z.ZodType<Prisma.AdminInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AdminArgsSchema: z.ZodType<Prisma.AdminDefaultArgs> = z.object({
  select: z.lazy(() => AdminSelectSchema).optional(),
  include: z.lazy(() => AdminIncludeSchema).optional(),
}).strict();

export const AdminSelectSchema: z.ZodType<Prisma.AdminSelect> = z.object({
  id: z.boolean().optional(),
  phone: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// OFFER
//------------------------------------------------------

export const OfferIncludeSchema: z.ZodType<Prisma.OfferInclude> = z.object({
  enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
  Coupon: z.union([z.boolean(),z.lazy(() => CouponFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OfferCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OfferArgsSchema: z.ZodType<Prisma.OfferDefaultArgs> = z.object({
  select: z.lazy(() => OfferSelectSchema).optional(),
  include: z.lazy(() => OfferIncludeSchema).optional(),
}).strict();

export const OfferCountOutputTypeArgsSchema: z.ZodType<Prisma.OfferCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OfferCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OfferCountOutputTypeSelectSchema: z.ZodType<Prisma.OfferCountOutputTypeSelect> = z.object({
  Coupon: z.boolean().optional(),
}).strict();

export const OfferSelectSchema: z.ZodType<Prisma.OfferSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  originalPrice: z.boolean().optional(),
  discountPrice: z.boolean().optional(),
  validFrom: z.boolean().optional(),
  validUntil: z.boolean().optional(),
  quantityLimit: z.boolean().optional(),
  sold: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  offerState: z.boolean().optional(),
  approvedAt: z.boolean().optional(),
  offerRejectedReason: z.boolean().optional(),
  enterpriseId: z.boolean().optional(),
  enterprise: z.union([z.boolean(),z.lazy(() => EnterpriseArgsSchema)]).optional(),
  Coupon: z.union([z.boolean(),z.lazy(() => CouponFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OfferCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COUPON
//------------------------------------------------------

export const CouponIncludeSchema: z.ZodType<Prisma.CouponInclude> = z.object({
  offerDetails: z.union([z.boolean(),z.lazy(() => OfferArgsSchema)]).optional(),
  client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
}).strict()

export const CouponArgsSchema: z.ZodType<Prisma.CouponDefaultArgs> = z.object({
  select: z.lazy(() => CouponSelectSchema).optional(),
  include: z.lazy(() => CouponIncludeSchema).optional(),
}).strict();

export const CouponSelectSchema: z.ZodType<Prisma.CouponSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  couponState: z.boolean().optional(),
  offerId: z.boolean().optional(),
  clientId: z.boolean().optional(),
  offerDetails: z.union([z.boolean(),z.lazy(() => OfferArgsSchema)]).optional(),
  client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Enterprise: z.lazy(() => EnterpriseListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Enterprise: z.lazy(() => EnterpriseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Enterprise: z.lazy(() => EnterpriseListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CategorySumOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Enterprise: z.union([ z.lazy(() => EnterpriseNullableScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional().nullable(),
  Client: z.union([ z.lazy(() => ClientNullableScalarRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional().nullable(),
  Employee: z.union([ z.lazy(() => EmployeeNullableScalarRelationFilterSchema),z.lazy(() => EmployeeWhereInputSchema) ]).optional().nullable(),
  Admin: z.union([ z.lazy(() => AdminNullableScalarRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Enterprise: z.lazy(() => EnterpriseOrderByWithRelationInputSchema).optional(),
  Client: z.lazy(() => ClientOrderByWithRelationInputSchema).optional(),
  Employee: z.lazy(() => EmployeeOrderByWithRelationInputSchema).optional(),
  Admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Enterprise: z.union([ z.lazy(() => EnterpriseNullableScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional().nullable(),
  Client: z.union([ z.lazy(() => ClientNullableScalarRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional().nullable(),
  Employee: z.union([ z.lazy(() => EmployeeNullableScalarRelationFilterSchema),z.lazy(() => EmployeeWhereInputSchema) ]).optional().nullable(),
  Admin: z.union([ z.lazy(() => AdminNullableScalarRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EnterpriseWhereInputSchema: z.ZodType<Prisma.EnterpriseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EnterpriseWhereInputSchema),z.lazy(() => EnterpriseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnterpriseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnterpriseWhereInputSchema),z.lazy(() => EnterpriseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commissionPercentage: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  enterpriseCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Offer: z.lazy(() => OfferListRelationFilterSchema).optional(),
  Employee: z.lazy(() => EmployeeListRelationFilterSchema).optional(),
  Category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const EnterpriseOrderByWithRelationInputSchema: z.ZodType<Prisma.EnterpriseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  enterpriseCode: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Offer: z.lazy(() => OfferOrderByRelationAggregateInputSchema).optional(),
  Employee: z.lazy(() => EmployeeOrderByRelationAggregateInputSchema).optional(),
  Category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const EnterpriseWhereUniqueInputSchema: z.ZodType<Prisma.EnterpriseWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    enterpriseCode: z.string(),
    userId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
    enterpriseCode: z.string(),
  }),
  z.object({
    id: z.number().int(),
    userId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    enterpriseCode: z.string(),
    userId: z.number().int(),
  }),
  z.object({
    enterpriseCode: z.string(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  enterpriseCode: z.string().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EnterpriseWhereInputSchema),z.lazy(() => EnterpriseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnterpriseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnterpriseWhereInputSchema),z.lazy(() => EnterpriseWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commissionPercentage: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Offer: z.lazy(() => OfferListRelationFilterSchema).optional(),
  Employee: z.lazy(() => EmployeeListRelationFilterSchema).optional(),
  Category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict());

export const EnterpriseOrderByWithAggregationInputSchema: z.ZodType<Prisma.EnterpriseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  enterpriseCode: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EnterpriseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EnterpriseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EnterpriseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EnterpriseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EnterpriseSumOrderByAggregateInputSchema).optional()
}).strict();

export const EnterpriseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EnterpriseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EnterpriseScalarWhereWithAggregatesInputSchema),z.lazy(() => EnterpriseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnterpriseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnterpriseScalarWhereWithAggregatesInputSchema),z.lazy(() => EnterpriseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  commissionPercentage: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  enterpriseCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ClientWhereInputSchema: z.ZodType<Prisma.ClientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DUI: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Coupons: z.lazy(() => CouponListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ClientOrderByWithRelationInputSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  DUI: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  Coupons: z.lazy(() => CouponOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ClientWhereUniqueInputSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    DUI: z.string(),
    userId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
    DUI: z.string(),
  }),
  z.object({
    id: z.number().int(),
    userId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    DUI: z.string(),
    userId: z.number().int(),
  }),
  z.object({
    DUI: z.string(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  DUI: z.string().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Coupons: z.lazy(() => CouponListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  DUI: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ClientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ClientSumOrderByAggregateInputSchema).optional()
}).strict();

export const ClientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  DUI: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const EmployeeWhereInputSchema: z.ZodType<Prisma.EmployeeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  enterprise: z.union([ z.lazy(() => EnterpriseScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
}).strict();

export const EmployeeOrderByWithRelationInputSchema: z.ZodType<Prisma.EmployeeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  enterprise: z.lazy(() => EnterpriseOrderByWithRelationInputSchema).optional()
}).strict();

export const EmployeeWhereUniqueInputSchema: z.ZodType<Prisma.EmployeeWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeWhereInputSchema),z.lazy(() => EmployeeWhereInputSchema).array() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  enterprise: z.union([ z.lazy(() => EnterpriseScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
}).strict());

export const EmployeeOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmployeeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmployeeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EmployeeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmployeeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmployeeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EmployeeSumOrderByAggregateInputSchema).optional()
}).strict();

export const EmployeeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmployeeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema),z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema),z.lazy(() => EmployeeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  enterpriseId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AdminWhereInputSchema: z.ZodType<Prisma.AdminWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AdminOrderByWithRelationInputSchema: z.ZodType<Prisma.AdminOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AdminWhereUniqueInputSchema: z.ZodType<Prisma.AdminWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AdminOrderByWithAggregationInputSchema: z.ZodType<Prisma.AdminOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AdminCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AdminAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AdminMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AdminMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AdminSumOrderByAggregateInputSchema).optional()
}).strict();

export const AdminScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AdminScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const OfferWhereInputSchema: z.ZodType<Prisma.OfferWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OfferWhereInputSchema),z.lazy(() => OfferWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OfferWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OfferWhereInputSchema),z.lazy(() => OfferWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  discountPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  validFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  validUntil: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantityLimit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  sold: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  offerState: z.union([ z.lazy(() => EnumOfferStateFilterSchema),z.lazy(() => OfferStateSchema) ]).optional(),
  approvedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  offerRejectedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enterprise: z.union([ z.lazy(() => EnterpriseScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  Coupon: z.lazy(() => CouponListRelationFilterSchema).optional()
}).strict();

export const OfferOrderByWithRelationInputSchema: z.ZodType<Prisma.OfferOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  validFrom: z.lazy(() => SortOrderSchema).optional(),
  validUntil: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sold: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  offerState: z.lazy(() => SortOrderSchema).optional(),
  approvedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  offerRejectedReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional(),
  enterprise: z.lazy(() => EnterpriseOrderByWithRelationInputSchema).optional(),
  Coupon: z.lazy(() => CouponOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OfferWhereUniqueInputSchema: z.ZodType<Prisma.OfferWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => OfferWhereInputSchema),z.lazy(() => OfferWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OfferWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OfferWhereInputSchema),z.lazy(() => OfferWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  discountPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  validFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  validUntil: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantityLimit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  sold: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  offerState: z.union([ z.lazy(() => EnumOfferStateFilterSchema),z.lazy(() => OfferStateSchema) ]).optional(),
  approvedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  offerRejectedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  enterprise: z.union([ z.lazy(() => EnterpriseScalarRelationFilterSchema),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  Coupon: z.lazy(() => CouponListRelationFilterSchema).optional()
}).strict());

export const OfferOrderByWithAggregationInputSchema: z.ZodType<Prisma.OfferOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  validFrom: z.lazy(() => SortOrderSchema).optional(),
  validUntil: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sold: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  offerState: z.lazy(() => SortOrderSchema).optional(),
  approvedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  offerRejectedReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OfferCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OfferAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OfferMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OfferMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OfferSumOrderByAggregateInputSchema).optional()
}).strict();

export const OfferScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OfferScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OfferScalarWhereWithAggregatesInputSchema),z.lazy(() => OfferScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OfferScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OfferScalarWhereWithAggregatesInputSchema),z.lazy(() => OfferScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  originalPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  discountPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  validFrom: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  validUntil: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  quantityLimit: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  sold: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  offerState: z.union([ z.lazy(() => EnumOfferStateWithAggregatesFilterSchema),z.lazy(() => OfferStateSchema) ]).optional(),
  approvedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  offerRejectedReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  enterpriseId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CouponWhereInputSchema: z.ZodType<Prisma.CouponWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CouponWhereInputSchema),z.lazy(() => CouponWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CouponWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CouponWhereInputSchema),z.lazy(() => CouponWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  couponState: z.union([ z.lazy(() => EnumCouponStateFilterSchema),z.lazy(() => CouponStateSchema) ]).optional(),
  offerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  clientId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  offerDetails: z.union([ z.lazy(() => OfferScalarRelationFilterSchema),z.lazy(() => OfferWhereInputSchema) ]).optional(),
  client: z.union([ z.lazy(() => ClientScalarRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
}).strict();

export const CouponOrderByWithRelationInputSchema: z.ZodType<Prisma.CouponOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  couponState: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  offerDetails: z.lazy(() => OfferOrderByWithRelationInputSchema).optional(),
  client: z.lazy(() => ClientOrderByWithRelationInputSchema).optional()
}).strict();

export const CouponWhereUniqueInputSchema: z.ZodType<Prisma.CouponWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    code: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => CouponWhereInputSchema),z.lazy(() => CouponWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CouponWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CouponWhereInputSchema),z.lazy(() => CouponWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  couponState: z.union([ z.lazy(() => EnumCouponStateFilterSchema),z.lazy(() => CouponStateSchema) ]).optional(),
  offerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  clientId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  offerDetails: z.union([ z.lazy(() => OfferScalarRelationFilterSchema),z.lazy(() => OfferWhereInputSchema) ]).optional(),
  client: z.union([ z.lazy(() => ClientScalarRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
}).strict());

export const CouponOrderByWithAggregationInputSchema: z.ZodType<Prisma.CouponOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  couponState: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CouponCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CouponAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CouponMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CouponMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CouponSumOrderByAggregateInputSchema).optional()
}).strict();

export const CouponScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CouponScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CouponScalarWhereWithAggregatesInputSchema),z.lazy(() => CouponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CouponScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CouponScalarWhereWithAggregatesInputSchema),z.lazy(() => CouponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  couponState: z.union([ z.lazy(() => EnumCouponStateWithAggregatesFilterSchema),z.lazy(() => CouponStateSchema) ]).optional(),
  offerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  clientId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EnterpriseCreateInputSchema: z.ZodType<Prisma.EnterpriseCreateInput> = z.object({
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutEnterpriseInputSchema),
  Offer: z.lazy(() => OfferCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  categoryId: z.number().int().optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUpdateInputSchema: z.ZodType<Prisma.EnterpriseUpdateInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEnterpriseNestedInputSchema).optional(),
  Offer: z.lazy(() => OfferUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseCreateManyInputSchema: z.ZodType<Prisma.EnterpriseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  categoryId: z.number().int().optional().nullable()
}).strict();

export const EnterpriseUpdateManyMutationInputSchema: z.ZodType<Prisma.EnterpriseUpdateManyMutationInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EnterpriseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClientCreateInputSchema: z.ZodType<Prisma.ClientCreateInput> = z.object({
  phone: z.string(),
  DUI: z.string(),
  Coupons: z.lazy(() => CouponCreateNestedManyWithoutClientInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutClientInputSchema)
}).strict();

export const ClientUncheckedCreateInputSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  DUI: z.string(),
  userId: z.number().int(),
  Coupons: z.lazy(() => CouponUncheckedCreateNestedManyWithoutClientInputSchema).optional()
}).strict();

export const ClientUpdateInputSchema: z.ZodType<Prisma.ClientUpdateInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Coupons: z.lazy(() => CouponUpdateManyWithoutClientNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Coupons: z.lazy(() => CouponUncheckedUpdateManyWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientCreateManyInputSchema: z.ZodType<Prisma.ClientCreateManyInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  DUI: z.string(),
  userId: z.number().int()
}).strict();

export const ClientUpdateManyMutationInputSchema: z.ZodType<Prisma.ClientUpdateManyMutationInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmployeeCreateInputSchema: z.ZodType<Prisma.EmployeeCreateInput> = z.object({
  phone: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutEmployeeInputSchema),
  enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutEmployeeInputSchema)
}).strict();

export const EmployeeUncheckedCreateInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string().optional().nullable(),
  userId: z.number().int(),
  enterpriseId: z.number().int()
}).strict();

export const EmployeeUpdateInputSchema: z.ZodType<Prisma.EmployeeUpdateInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEmployeeNestedInputSchema).optional(),
  enterprise: z.lazy(() => EnterpriseUpdateOneRequiredWithoutEmployeeNestedInputSchema).optional()
}).strict();

export const EmployeeUncheckedUpdateInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmployeeCreateManyInputSchema: z.ZodType<Prisma.EmployeeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string().optional().nullable(),
  userId: z.number().int(),
  enterpriseId: z.number().int()
}).strict();

export const EmployeeUpdateManyMutationInputSchema: z.ZodType<Prisma.EmployeeUpdateManyMutationInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EmployeeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminCreateInputSchema: z.ZodType<Prisma.AdminCreateInput> = z.object({
  phone: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAdminInputSchema)
}).strict();

export const AdminUncheckedCreateInputSchema: z.ZodType<Prisma.AdminUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  userId: z.number().int()
}).strict();

export const AdminUpdateInputSchema: z.ZodType<Prisma.AdminUpdateInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminCreateManyInputSchema: z.ZodType<Prisma.AdminCreateManyInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  userId: z.number().int()
}).strict();

export const AdminUpdateManyMutationInputSchema: z.ZodType<Prisma.AdminUpdateManyMutationInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OfferCreateInputSchema: z.ZodType<Prisma.OfferCreateInput> = z.object({
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutOfferInputSchema),
  Coupon: z.lazy(() => CouponCreateNestedManyWithoutOfferDetailsInputSchema).optional()
}).strict();

export const OfferUncheckedCreateInputSchema: z.ZodType<Prisma.OfferUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  enterpriseId: z.number().int(),
  Coupon: z.lazy(() => CouponUncheckedCreateNestedManyWithoutOfferDetailsInputSchema).optional()
}).strict();

export const OfferUpdateInputSchema: z.ZodType<Prisma.OfferUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterprise: z.lazy(() => EnterpriseUpdateOneRequiredWithoutOfferNestedInputSchema).optional(),
  Coupon: z.lazy(() => CouponUpdateManyWithoutOfferDetailsNestedInputSchema).optional()
}).strict();

export const OfferUncheckedUpdateInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Coupon: z.lazy(() => CouponUncheckedUpdateManyWithoutOfferDetailsNestedInputSchema).optional()
}).strict();

export const OfferCreateManyInputSchema: z.ZodType<Prisma.OfferCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  enterpriseId: z.number().int()
}).strict();

export const OfferUpdateManyMutationInputSchema: z.ZodType<Prisma.OfferUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OfferUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponCreateInputSchema: z.ZodType<Prisma.CouponCreateInput> = z.object({
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerDetails: z.lazy(() => OfferCreateNestedOneWithoutCouponInputSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutCouponsInputSchema)
}).strict();

export const CouponUncheckedCreateInputSchema: z.ZodType<Prisma.CouponUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerId: z.number().int(),
  clientId: z.number().int()
}).strict();

export const CouponUpdateInputSchema: z.ZodType<Prisma.CouponUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerDetails: z.lazy(() => OfferUpdateOneRequiredWithoutCouponNestedInputSchema).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutCouponsNestedInputSchema).optional()
}).strict();

export const CouponUncheckedUpdateInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponCreateManyInputSchema: z.ZodType<Prisma.CouponCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerId: z.number().int(),
  clientId: z.number().int()
}).strict();

export const CouponUpdateManyMutationInputSchema: z.ZodType<Prisma.CouponUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnterpriseListRelationFilterSchema: z.ZodType<Prisma.EnterpriseListRelationFilter> = z.object({
  every: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  some: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  none: z.lazy(() => EnterpriseWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const EnterpriseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EnterpriseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.CategorySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnterpriseNullableScalarRelationFilterSchema: z.ZodType<Prisma.EnterpriseNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EnterpriseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EnterpriseWhereInputSchema).optional().nullable()
}).strict();

export const ClientNullableScalarRelationFilterSchema: z.ZodType<Prisma.ClientNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ClientWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ClientWhereInputSchema).optional().nullable()
}).strict();

export const EmployeeNullableScalarRelationFilterSchema: z.ZodType<Prisma.EmployeeNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EmployeeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EmployeeWhereInputSchema).optional().nullable()
}).strict();

export const AdminNullableScalarRelationFilterSchema: z.ZodType<Prisma.AdminNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AdminWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AdminWhereInputSchema).optional().nullable()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const OfferListRelationFilterSchema: z.ZodType<Prisma.OfferListRelationFilter> = z.object({
  every: z.lazy(() => OfferWhereInputSchema).optional(),
  some: z.lazy(() => OfferWhereInputSchema).optional(),
  none: z.lazy(() => OfferWhereInputSchema).optional()
}).strict();

export const EmployeeListRelationFilterSchema: z.ZodType<Prisma.EmployeeListRelationFilter> = z.object({
  every: z.lazy(() => EmployeeWhereInputSchema).optional(),
  some: z.lazy(() => EmployeeWhereInputSchema).optional(),
  none: z.lazy(() => EmployeeWhereInputSchema).optional()
}).strict();

export const CategoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.CategoryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const OfferOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OfferOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmployeeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseCountOrderByAggregateInputSchema: z.ZodType<Prisma.EnterpriseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  enterpriseCode: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EnterpriseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EnterpriseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  enterpriseCode: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseMinOrderByAggregateInputSchema: z.ZodType<Prisma.EnterpriseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  enterpriseCode: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseSumOrderByAggregateInputSchema: z.ZodType<Prisma.EnterpriseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  commissionPercentage: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const CouponListRelationFilterSchema: z.ZodType<Prisma.CouponListRelationFilter> = z.object({
  every: z.lazy(() => CouponWhereInputSchema).optional(),
  some: z.lazy(() => CouponWhereInputSchema).optional(),
  none: z.lazy(() => CouponWhereInputSchema).optional()
}).strict();

export const CouponOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CouponOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  DUI: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClientAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  DUI: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  DUI: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClientSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnterpriseScalarRelationFilterSchema: z.ZodType<Prisma.EnterpriseScalarRelationFilter> = z.object({
  is: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  isNot: z.lazy(() => EnterpriseWhereInputSchema).optional()
}).strict();

export const EmployeeCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmployeeSumOrderByAggregateInputSchema: z.ZodType<Prisma.EmployeeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminCountOrderByAggregateInputSchema: z.ZodType<Prisma.AdminCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AdminAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMinOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminSumOrderByAggregateInputSchema: z.ZodType<Prisma.AdminSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumOfferStateFilterSchema: z.ZodType<Prisma.EnumOfferStateFilter> = z.object({
  equals: z.lazy(() => OfferStateSchema).optional(),
  in: z.lazy(() => OfferStateSchema).array().optional(),
  notIn: z.lazy(() => OfferStateSchema).array().optional(),
  not: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => NestedEnumOfferStateFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const OfferCountOrderByAggregateInputSchema: z.ZodType<Prisma.OfferCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  validFrom: z.lazy(() => SortOrderSchema).optional(),
  validUntil: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.lazy(() => SortOrderSchema).optional(),
  sold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  offerState: z.lazy(() => SortOrderSchema).optional(),
  approvedAt: z.lazy(() => SortOrderSchema).optional(),
  offerRejectedReason: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OfferAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OfferAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.lazy(() => SortOrderSchema).optional(),
  sold: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OfferMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OfferMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  validFrom: z.lazy(() => SortOrderSchema).optional(),
  validUntil: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.lazy(() => SortOrderSchema).optional(),
  sold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  offerState: z.lazy(() => SortOrderSchema).optional(),
  approvedAt: z.lazy(() => SortOrderSchema).optional(),
  offerRejectedReason: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OfferMinOrderByAggregateInputSchema: z.ZodType<Prisma.OfferMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  validFrom: z.lazy(() => SortOrderSchema).optional(),
  validUntil: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.lazy(() => SortOrderSchema).optional(),
  sold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  offerState: z.lazy(() => SortOrderSchema).optional(),
  approvedAt: z.lazy(() => SortOrderSchema).optional(),
  offerRejectedReason: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OfferSumOrderByAggregateInputSchema: z.ZodType<Prisma.OfferSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  originalPrice: z.lazy(() => SortOrderSchema).optional(),
  discountPrice: z.lazy(() => SortOrderSchema).optional(),
  quantityLimit: z.lazy(() => SortOrderSchema).optional(),
  sold: z.lazy(() => SortOrderSchema).optional(),
  enterpriseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumOfferStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOfferStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OfferStateSchema).optional(),
  in: z.lazy(() => OfferStateSchema).array().optional(),
  notIn: z.lazy(() => OfferStateSchema).array().optional(),
  not: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => NestedEnumOfferStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOfferStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOfferStateFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumCouponStateFilterSchema: z.ZodType<Prisma.EnumCouponStateFilter> = z.object({
  equals: z.lazy(() => CouponStateSchema).optional(),
  in: z.lazy(() => CouponStateSchema).array().optional(),
  notIn: z.lazy(() => CouponStateSchema).array().optional(),
  not: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => NestedEnumCouponStateFilterSchema) ]).optional(),
}).strict();

export const OfferScalarRelationFilterSchema: z.ZodType<Prisma.OfferScalarRelationFilter> = z.object({
  is: z.lazy(() => OfferWhereInputSchema).optional(),
  isNot: z.lazy(() => OfferWhereInputSchema).optional()
}).strict();

export const ClientScalarRelationFilterSchema: z.ZodType<Prisma.ClientScalarRelationFilter> = z.object({
  is: z.lazy(() => ClientWhereInputSchema).optional(),
  isNot: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const CouponCountOrderByAggregateInputSchema: z.ZodType<Prisma.CouponCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  couponState: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CouponAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CouponAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CouponMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CouponMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  couponState: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CouponMinOrderByAggregateInputSchema: z.ZodType<Prisma.CouponMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  couponState: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CouponSumOrderByAggregateInputSchema: z.ZodType<Prisma.CouponSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  offerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumCouponStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCouponStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CouponStateSchema).optional(),
  in: z.lazy(() => CouponStateSchema).array().optional(),
  notIn: z.lazy(() => CouponStateSchema).array().optional(),
  not: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => NestedEnumCouponStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCouponStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCouponStateFilterSchema).optional()
}).strict();

export const EnterpriseCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema).array(),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnterpriseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnterpriseUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema).array(),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnterpriseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnterpriseUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.EnterpriseUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema).array(),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnterpriseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnterpriseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnterpriseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnterpriseScalarWhereInputSchema),z.lazy(() => EnterpriseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnterpriseUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema).array(),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => EnterpriseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnterpriseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnterpriseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnterpriseWhereUniqueInputSchema),z.lazy(() => EnterpriseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnterpriseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => EnterpriseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnterpriseScalarWhereInputSchema),z.lazy(() => EnterpriseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EnterpriseCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional()
}).strict();

export const ClientCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const EmployeeCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EmployeeCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional()
}).strict();

export const AdminCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional()
}).strict();

export const ClientUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ClientUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const EmployeeUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional()
}).strict();

export const AdminUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const EnterpriseUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EnterpriseUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EnterpriseUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EnterpriseUpdateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ClientUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ClientUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ClientUpdateWithoutUserInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const EmployeeUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EmployeeUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EmployeeUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmployeeUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EmployeeUpdateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AdminUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const EnterpriseUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EnterpriseUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EnterpriseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EnterpriseUpdateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ClientUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ClientUpdateWithoutUserInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const EmployeeUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmployeeCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => EmployeeUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmployeeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmployeeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmployeeUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => EmployeeUpdateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnterpriseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEnterpriseInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OfferCreateNestedManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferCreateNestedManyWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OfferCreateManyEnterpriseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmployeeCreateNestedManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeCreateNestedManyWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmployeeCreateManyEnterpriseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutEnterpriseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutEnterpriseInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const OfferUncheckedCreateNestedManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUncheckedCreateNestedManyWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OfferCreateManyEnterpriseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmployeeUncheckedCreateNestedManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateNestedManyWithoutEnterpriseInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmployeeCreateManyEnterpriseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnterpriseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEnterpriseInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEnterpriseInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEnterpriseInputSchema),z.lazy(() => UserUpdateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEnterpriseInputSchema) ]).optional(),
}).strict();

export const OfferUpdateManyWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.OfferUpdateManyWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OfferUpsertWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => OfferUpsertWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OfferCreateManyEnterpriseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OfferUpdateWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => OfferUpdateWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OfferUpdateManyWithWhereWithoutEnterpriseInputSchema),z.lazy(() => OfferUpdateManyWithWhereWithoutEnterpriseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OfferScalarWhereInputSchema),z.lazy(() => OfferScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmployeeUpdateManyWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.EmployeeUpdateManyWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmployeeUpsertWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpsertWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmployeeCreateManyEnterpriseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmployeeUpdateWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpdateWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmployeeUpdateManyWithWhereWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpdateManyWithWhereWithoutEnterpriseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmployeeScalarWhereInputSchema),z.lazy(() => EmployeeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutEnterpriseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutEnterpriseInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutEnterpriseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutEnterpriseInputSchema),z.lazy(() => CategoryUpdateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutEnterpriseInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const OfferUncheckedUpdateManyWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateManyWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => OfferCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OfferUpsertWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => OfferUpsertWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OfferCreateManyEnterpriseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OfferWhereUniqueInputSchema),z.lazy(() => OfferWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OfferUpdateWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => OfferUpdateWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OfferUpdateManyWithWhereWithoutEnterpriseInputSchema),z.lazy(() => OfferUpdateManyWithWhereWithoutEnterpriseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OfferScalarWhereInputSchema),z.lazy(() => OfferScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema).array(),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema),z.lazy(() => EmployeeCreateOrConnectWithoutEnterpriseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmployeeUpsertWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpsertWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmployeeCreateManyEnterpriseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmployeeWhereUniqueInputSchema),z.lazy(() => EmployeeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmployeeUpdateWithWhereUniqueWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpdateWithWhereUniqueWithoutEnterpriseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmployeeUpdateManyWithWhereWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUpdateManyWithWhereWithoutEnterpriseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmployeeScalarWhereInputSchema),z.lazy(() => EmployeeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CouponCreateNestedManyWithoutClientInputSchema: z.ZodType<Prisma.CouponCreateNestedManyWithoutClientInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponCreateWithoutClientInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema),z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyClientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutClientInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutClientInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutClientInputSchema),z.lazy(() => UserUncheckedCreateWithoutClientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutClientInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CouponUncheckedCreateNestedManyWithoutClientInputSchema: z.ZodType<Prisma.CouponUncheckedCreateNestedManyWithoutClientInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponCreateWithoutClientInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema),z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyClientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CouponUpdateManyWithoutClientNestedInputSchema: z.ZodType<Prisma.CouponUpdateManyWithoutClientNestedInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponCreateWithoutClientInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema),z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CouponUpsertWithWhereUniqueWithoutClientInputSchema),z.lazy(() => CouponUpsertWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyClientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CouponUpdateWithWhereUniqueWithoutClientInputSchema),z.lazy(() => CouponUpdateWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CouponUpdateManyWithWhereWithoutClientInputSchema),z.lazy(() => CouponUpdateManyWithWhereWithoutClientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutClientNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutClientNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutClientInputSchema),z.lazy(() => UserUncheckedCreateWithoutClientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutClientInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutClientInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutClientInputSchema),z.lazy(() => UserUpdateWithoutClientInputSchema),z.lazy(() => UserUncheckedUpdateWithoutClientInputSchema) ]).optional(),
}).strict();

export const CouponUncheckedUpdateManyWithoutClientNestedInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateManyWithoutClientNestedInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponCreateWithoutClientInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema),z.lazy(() => CouponCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CouponUpsertWithWhereUniqueWithoutClientInputSchema),z.lazy(() => CouponUpsertWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyClientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CouponUpdateWithWhereUniqueWithoutClientInputSchema),z.lazy(() => CouponUpdateWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CouponUpdateManyWithWhereWithoutClientInputSchema),z.lazy(() => CouponUpdateManyWithWhereWithoutClientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEmployeeInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEmployeeInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmployeeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEmployeeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnterpriseCreateNestedOneWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseCreateNestedOneWithoutEmployeeInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutEmployeeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutEmployeeInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutEmployeeNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEmployeeNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmployeeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEmployeeInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEmployeeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEmployeeInputSchema),z.lazy(() => UserUpdateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmployeeInputSchema) ]).optional(),
}).strict();

export const EnterpriseUpdateOneRequiredWithoutEmployeeNestedInputSchema: z.ZodType<Prisma.EnterpriseUpdateOneRequiredWithoutEmployeeNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutEmployeeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutEmployeeInputSchema).optional(),
  upsert: z.lazy(() => EnterpriseUpsertWithoutEmployeeInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateToOneWithWhereWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUpdateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutEmployeeInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAdminNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdminInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAdminInputSchema),z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]).optional(),
}).strict();

export const EnterpriseCreateNestedOneWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseCreateNestedOneWithoutOfferInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutOfferInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutOfferInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional()
}).strict();

export const CouponCreateNestedManyWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponCreateNestedManyWithoutOfferDetailsInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyOfferDetailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CouponUncheckedCreateNestedManyWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUncheckedCreateNestedManyWithoutOfferDetailsInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyOfferDetailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumOfferStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOfferStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => OfferStateSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnterpriseUpdateOneRequiredWithoutOfferNestedInputSchema: z.ZodType<Prisma.EnterpriseUpdateOneRequiredWithoutOfferNestedInput> = z.object({
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutOfferInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EnterpriseCreateOrConnectWithoutOfferInputSchema).optional(),
  upsert: z.lazy(() => EnterpriseUpsertWithoutOfferInputSchema).optional(),
  connect: z.lazy(() => EnterpriseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EnterpriseUpdateToOneWithWhereWithoutOfferInputSchema),z.lazy(() => EnterpriseUpdateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutOfferInputSchema) ]).optional(),
}).strict();

export const CouponUpdateManyWithoutOfferDetailsNestedInputSchema: z.ZodType<Prisma.CouponUpdateManyWithoutOfferDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CouponUpsertWithWhereUniqueWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpsertWithWhereUniqueWithoutOfferDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyOfferDetailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CouponUpdateWithWhereUniqueWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpdateWithWhereUniqueWithoutOfferDetailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CouponUpdateManyWithWhereWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpdateManyWithWhereWithoutOfferDetailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CouponUncheckedUpdateManyWithoutOfferDetailsNestedInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateManyWithoutOfferDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema).array(),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema),z.lazy(() => CouponCreateOrConnectWithoutOfferDetailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CouponUpsertWithWhereUniqueWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpsertWithWhereUniqueWithoutOfferDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CouponCreateManyOfferDetailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CouponWhereUniqueInputSchema),z.lazy(() => CouponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CouponUpdateWithWhereUniqueWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpdateWithWhereUniqueWithoutOfferDetailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CouponUpdateManyWithWhereWithoutOfferDetailsInputSchema),z.lazy(() => CouponUpdateManyWithWhereWithoutOfferDetailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OfferCreateNestedOneWithoutCouponInputSchema: z.ZodType<Prisma.OfferCreateNestedOneWithoutCouponInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedCreateWithoutCouponInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OfferCreateOrConnectWithoutCouponInputSchema).optional(),
  connect: z.lazy(() => OfferWhereUniqueInputSchema).optional()
}).strict();

export const ClientCreateNestedOneWithoutCouponsInputSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutCouponsInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCouponsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutCouponsInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const EnumCouponStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCouponStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CouponStateSchema).optional()
}).strict();

export const OfferUpdateOneRequiredWithoutCouponNestedInputSchema: z.ZodType<Prisma.OfferUpdateOneRequiredWithoutCouponNestedInput> = z.object({
  create: z.union([ z.lazy(() => OfferCreateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedCreateWithoutCouponInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OfferCreateOrConnectWithoutCouponInputSchema).optional(),
  upsert: z.lazy(() => OfferUpsertWithoutCouponInputSchema).optional(),
  connect: z.lazy(() => OfferWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OfferUpdateToOneWithWhereWithoutCouponInputSchema),z.lazy(() => OfferUpdateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedUpdateWithoutCouponInputSchema) ]).optional(),
}).strict();

export const ClientUpdateOneRequiredWithoutCouponsNestedInputSchema: z.ZodType<Prisma.ClientUpdateOneRequiredWithoutCouponsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCouponsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutCouponsInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutCouponsInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutCouponsInputSchema),z.lazy(() => ClientUpdateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutCouponsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumOfferStateFilterSchema: z.ZodType<Prisma.NestedEnumOfferStateFilter> = z.object({
  equals: z.lazy(() => OfferStateSchema).optional(),
  in: z.lazy(() => OfferStateSchema).array().optional(),
  notIn: z.lazy(() => OfferStateSchema).array().optional(),
  not: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => NestedEnumOfferStateFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumOfferStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOfferStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OfferStateSchema).optional(),
  in: z.lazy(() => OfferStateSchema).array().optional(),
  notIn: z.lazy(() => OfferStateSchema).array().optional(),
  not: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => NestedEnumOfferStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOfferStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOfferStateFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumCouponStateFilterSchema: z.ZodType<Prisma.NestedEnumCouponStateFilter> = z.object({
  equals: z.lazy(() => CouponStateSchema).optional(),
  in: z.lazy(() => CouponStateSchema).array().optional(),
  notIn: z.lazy(() => CouponStateSchema).array().optional(),
  not: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => NestedEnumCouponStateFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCouponStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCouponStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CouponStateSchema).optional(),
  in: z.lazy(() => CouponStateSchema).array().optional(),
  notIn: z.lazy(() => CouponStateSchema).array().optional(),
  not: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => NestedEnumCouponStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCouponStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCouponStateFilterSchema).optional()
}).strict();

export const EnterpriseCreateWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseCreateWithoutCategoryInput> = z.object({
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutEnterpriseInputSchema),
  Offer: z.lazy(() => OfferCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  Offer: z.lazy(() => OfferUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const EnterpriseCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.EnterpriseCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EnterpriseCreateManyCategoryInputSchema),z.lazy(() => EnterpriseCreateManyCategoryInputSchema).array() ]),
}).strict();

export const EnterpriseUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EnterpriseUpdateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const EnterpriseUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EnterpriseUpdateWithoutCategoryInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const EnterpriseUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => EnterpriseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EnterpriseUpdateManyMutationInputSchema),z.lazy(() => EnterpriseUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const EnterpriseScalarWhereInputSchema: z.ZodType<Prisma.EnterpriseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EnterpriseScalarWhereInputSchema),z.lazy(() => EnterpriseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnterpriseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnterpriseScalarWhereInputSchema),z.lazy(() => EnterpriseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commissionPercentage: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  enterpriseCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const EnterpriseCreateWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseCreateWithoutUserInput> = z.object({
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  Offer: z.lazy(() => OfferCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  categoryId: z.number().int().optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ClientCreateWithoutUserInputSchema: z.ZodType<Prisma.ClientCreateWithoutUserInput> = z.object({
  phone: z.string(),
  DUI: z.string(),
  Coupons: z.lazy(() => CouponCreateNestedManyWithoutClientInputSchema).optional()
}).strict();

export const ClientUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  DUI: z.string(),
  Coupons: z.lazy(() => CouponUncheckedCreateNestedManyWithoutClientInputSchema).optional()
}).strict();

export const ClientCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EmployeeCreateWithoutUserInputSchema: z.ZodType<Prisma.EmployeeCreateWithoutUserInput> = z.object({
  phone: z.string().optional().nullable(),
  enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutEmployeeInputSchema)
}).strict();

export const EmployeeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string().optional().nullable(),
  enterpriseId: z.number().int()
}).strict();

export const EmployeeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EmployeeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EmployeeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AdminCreateWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateWithoutUserInput> = z.object({
  phone: z.string()
}).strict();

export const AdminUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string()
}).strict();

export const AdminCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EnterpriseUpsertWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => EnterpriseUpdateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => EnterpriseWhereInputSchema).optional()
}).strict();

export const EnterpriseUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EnterpriseUpdateWithoutUserInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EnterpriseUpdateWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUpdateWithoutUserInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Offer: z.lazy(() => OfferUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const ClientUpsertWithoutUserInputSchema: z.ZodType<Prisma.ClientUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ClientUpdateWithoutUserInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutUserInputSchema),z.lazy(() => ClientUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ClientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ClientUpdateWithoutUserInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ClientUpdateWithoutUserInputSchema: z.ZodType<Prisma.ClientUpdateWithoutUserInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Coupons: z.lazy(() => CouponUpdateManyWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Coupons: z.lazy(() => CouponUncheckedUpdateManyWithoutClientNestedInputSchema).optional()
}).strict();

export const EmployeeUpsertWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => EmployeeUpdateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => EmployeeWhereInputSchema).optional()
}).strict();

export const EmployeeUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EmployeeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmployeeUpdateWithoutUserInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EmployeeUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUpdateWithoutUserInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterprise: z.lazy(() => EnterpriseUpdateOneRequiredWithoutEmployeeNestedInputSchema).optional()
}).strict();

export const EmployeeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUpsertWithoutUserInputSchema: z.ZodType<Prisma.AdminUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AdminUpdateWithoutUserInputSchema: z.ZodType<Prisma.AdminUpdateWithoutUserInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserCreateWithoutEnterpriseInput> = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Client: z.lazy(() => ClientCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Client: z.lazy(() => ClientUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const OfferCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferCreateWithoutEnterpriseInput> = z.object({
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  Coupon: z.lazy(() => CouponCreateNestedManyWithoutOfferDetailsInputSchema).optional()
}).strict();

export const OfferUncheckedCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUncheckedCreateWithoutEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  Coupon: z.lazy(() => CouponUncheckedCreateNestedManyWithoutOfferDetailsInputSchema).optional()
}).strict();

export const OfferCreateOrConnectWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferCreateOrConnectWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => OfferWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const OfferCreateManyEnterpriseInputEnvelopeSchema: z.ZodType<Prisma.OfferCreateManyEnterpriseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OfferCreateManyEnterpriseInputSchema),z.lazy(() => OfferCreateManyEnterpriseInputSchema).array() ]),
}).strict();

export const EmployeeCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeCreateWithoutEnterpriseInput> = z.object({
  phone: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutEmployeeInputSchema)
}).strict();

export const EmployeeUncheckedCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUncheckedCreateWithoutEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string().optional().nullable(),
  userId: z.number().int()
}).strict();

export const EmployeeCreateOrConnectWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeCreateOrConnectWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => EmployeeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const EmployeeCreateManyEnterpriseInputEnvelopeSchema: z.ZodType<Prisma.EmployeeCreateManyEnterpriseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmployeeCreateManyEnterpriseInputSchema),z.lazy(() => EmployeeCreateManyEnterpriseInputSchema).array() ]),
}).strict();

export const CategoryCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryCreateWithoutEnterpriseInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUncheckedCreateWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryCreateOrConnectWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const UserUpsertWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserUpsertWithoutEnterpriseInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEnterpriseInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnterpriseInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEnterpriseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEnterpriseInputSchema) ]),
}).strict();

export const UserUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserUpdateWithoutEnterpriseInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Client: z.lazy(() => ClientUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Client: z.lazy(() => ClientUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const OfferUpsertWithWhereUniqueWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUpsertWithWhereUniqueWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => OfferWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OfferUpdateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedUpdateWithoutEnterpriseInputSchema) ]),
  create: z.union([ z.lazy(() => OfferCreateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const OfferUpdateWithWhereUniqueWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUpdateWithWhereUniqueWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => OfferWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OfferUpdateWithoutEnterpriseInputSchema),z.lazy(() => OfferUncheckedUpdateWithoutEnterpriseInputSchema) ]),
}).strict();

export const OfferUpdateManyWithWhereWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUpdateManyWithWhereWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => OfferScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OfferUpdateManyMutationInputSchema),z.lazy(() => OfferUncheckedUpdateManyWithoutEnterpriseInputSchema) ]),
}).strict();

export const OfferScalarWhereInputSchema: z.ZodType<Prisma.OfferScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OfferScalarWhereInputSchema),z.lazy(() => OfferScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OfferScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OfferScalarWhereInputSchema),z.lazy(() => OfferScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  discountPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  validFrom: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  validUntil: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantityLimit: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  sold: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  offerState: z.union([ z.lazy(() => EnumOfferStateFilterSchema),z.lazy(() => OfferStateSchema) ]).optional(),
  approvedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  offerRejectedReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const EmployeeUpsertWithWhereUniqueWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUpsertWithWhereUniqueWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => EmployeeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmployeeUpdateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutEnterpriseInputSchema) ]),
  create: z.union([ z.lazy(() => EmployeeCreateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedCreateWithoutEnterpriseInputSchema) ]),
}).strict();

export const EmployeeUpdateWithWhereUniqueWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUpdateWithWhereUniqueWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => EmployeeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmployeeUpdateWithoutEnterpriseInputSchema),z.lazy(() => EmployeeUncheckedUpdateWithoutEnterpriseInputSchema) ]),
}).strict();

export const EmployeeUpdateManyWithWhereWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUpdateManyWithWhereWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => EmployeeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmployeeUpdateManyMutationInputSchema),z.lazy(() => EmployeeUncheckedUpdateManyWithoutEnterpriseInputSchema) ]),
}).strict();

export const EmployeeScalarWhereInputSchema: z.ZodType<Prisma.EmployeeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmployeeScalarWhereInputSchema),z.lazy(() => EmployeeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmployeeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmployeeScalarWhereInputSchema),z.lazy(() => EmployeeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enterpriseId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CategoryUpsertWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutEnterpriseInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutEnterpriseInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutEnterpriseInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutEnterpriseInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutEnterpriseInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutEnterpriseInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutEnterpriseInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponCreateWithoutClientInputSchema: z.ZodType<Prisma.CouponCreateWithoutClientInput> = z.object({
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerDetails: z.lazy(() => OfferCreateNestedOneWithoutCouponInputSchema)
}).strict();

export const CouponUncheckedCreateWithoutClientInputSchema: z.ZodType<Prisma.CouponUncheckedCreateWithoutClientInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerId: z.number().int()
}).strict();

export const CouponCreateOrConnectWithoutClientInputSchema: z.ZodType<Prisma.CouponCreateOrConnectWithoutClientInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema) ]),
}).strict();

export const CouponCreateManyClientInputEnvelopeSchema: z.ZodType<Prisma.CouponCreateManyClientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CouponCreateManyClientInputSchema),z.lazy(() => CouponCreateManyClientInputSchema).array() ]),
}).strict();

export const UserCreateWithoutClientInputSchema: z.ZodType<Prisma.UserCreateWithoutClientInput> = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutClientInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutClientInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutClientInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutClientInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutClientInputSchema),z.lazy(() => UserUncheckedCreateWithoutClientInputSchema) ]),
}).strict();

export const CouponUpsertWithWhereUniqueWithoutClientInputSchema: z.ZodType<Prisma.CouponUpsertWithWhereUniqueWithoutClientInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CouponUpdateWithoutClientInputSchema),z.lazy(() => CouponUncheckedUpdateWithoutClientInputSchema) ]),
  create: z.union([ z.lazy(() => CouponCreateWithoutClientInputSchema),z.lazy(() => CouponUncheckedCreateWithoutClientInputSchema) ]),
}).strict();

export const CouponUpdateWithWhereUniqueWithoutClientInputSchema: z.ZodType<Prisma.CouponUpdateWithWhereUniqueWithoutClientInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CouponUpdateWithoutClientInputSchema),z.lazy(() => CouponUncheckedUpdateWithoutClientInputSchema) ]),
}).strict();

export const CouponUpdateManyWithWhereWithoutClientInputSchema: z.ZodType<Prisma.CouponUpdateManyWithWhereWithoutClientInput> = z.object({
  where: z.lazy(() => CouponScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CouponUpdateManyMutationInputSchema),z.lazy(() => CouponUncheckedUpdateManyWithoutClientInputSchema) ]),
}).strict();

export const CouponScalarWhereInputSchema: z.ZodType<Prisma.CouponScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CouponScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CouponScalarWhereInputSchema),z.lazy(() => CouponScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  couponState: z.union([ z.lazy(() => EnumCouponStateFilterSchema),z.lazy(() => CouponStateSchema) ]).optional(),
  offerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  clientId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserUpsertWithoutClientInputSchema: z.ZodType<Prisma.UserUpsertWithoutClientInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutClientInputSchema),z.lazy(() => UserUncheckedUpdateWithoutClientInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutClientInputSchema),z.lazy(() => UserUncheckedCreateWithoutClientInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutClientInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutClientInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutClientInputSchema),z.lazy(() => UserUncheckedUpdateWithoutClientInputSchema) ]),
}).strict();

export const UserUpdateWithoutClientInputSchema: z.ZodType<Prisma.UserUpdateWithoutClientInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutClientInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutClientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutEmployeeInputSchema: z.ZodType<Prisma.UserCreateWithoutEmployeeInput> = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEmployeeInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEmployeeInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEmployeeInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEmployeeInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmployeeInputSchema) ]),
}).strict();

export const EnterpriseCreateWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseCreateWithoutEmployeeInput> = z.object({
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutEnterpriseInputSchema),
  Offer: z.lazy(() => OfferCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateWithoutEmployeeInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  categoryId: z.number().int().optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseCreateOrConnectWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseCreateOrConnectWithoutEmployeeInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutEmployeeInputSchema) ]),
}).strict();

export const UserUpsertWithoutEmployeeInputSchema: z.ZodType<Prisma.UserUpsertWithoutEmployeeInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmployeeInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedCreateWithoutEmployeeInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEmployeeInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEmployeeInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEmployeeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEmployeeInputSchema) ]),
}).strict();

export const UserUpdateWithoutEmployeeInputSchema: z.ZodType<Prisma.UserUpdateWithoutEmployeeInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEmployeeInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEmployeeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const EnterpriseUpsertWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseUpsertWithoutEmployeeInput> = z.object({
  update: z.union([ z.lazy(() => EnterpriseUpdateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutEmployeeInputSchema) ]),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutEmployeeInputSchema) ]),
  where: z.lazy(() => EnterpriseWhereInputSchema).optional()
}).strict();

export const EnterpriseUpdateToOneWithWhereWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseUpdateToOneWithWhereWithoutEmployeeInput> = z.object({
  where: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EnterpriseUpdateWithoutEmployeeInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutEmployeeInputSchema) ]),
}).strict();

export const EnterpriseUpdateWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseUpdateWithoutEmployeeInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEnterpriseNestedInputSchema).optional(),
  Offer: z.lazy(() => OfferUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateWithoutEmployeeInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateWithoutEmployeeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Offer: z.lazy(() => OfferUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateWithoutAdminInput> = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAdminInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const UserUpsertWithoutAdminInputSchema: z.ZodType<Prisma.UserUpsertWithoutAdminInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const UserUpdateWithoutAdminInputSchema: z.ZodType<Prisma.UserUpdateWithoutAdminInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Enterprise: z.lazy(() => EnterpriseUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Client: z.lazy(() => ClientUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const EnterpriseCreateWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseCreateWithoutOfferInput> = z.object({
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutEnterpriseInputSchema),
  Employee: z.lazy(() => EmployeeCreateNestedManyWithoutEnterpriseInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseUncheckedCreateWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseUncheckedCreateWithoutOfferInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int(),
  categoryId: z.number().int().optional().nullable(),
  Employee: z.lazy(() => EmployeeUncheckedCreateNestedManyWithoutEnterpriseInputSchema).optional()
}).strict();

export const EnterpriseCreateOrConnectWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseCreateOrConnectWithoutOfferInput> = z.object({
  where: z.lazy(() => EnterpriseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutOfferInputSchema) ]),
}).strict();

export const CouponCreateWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponCreateWithoutOfferDetailsInput> = z.object({
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutCouponsInputSchema)
}).strict();

export const CouponUncheckedCreateWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUncheckedCreateWithoutOfferDetailsInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  clientId: z.number().int()
}).strict();

export const CouponCreateOrConnectWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponCreateOrConnectWithoutOfferDetailsInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema) ]),
}).strict();

export const CouponCreateManyOfferDetailsInputEnvelopeSchema: z.ZodType<Prisma.CouponCreateManyOfferDetailsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CouponCreateManyOfferDetailsInputSchema),z.lazy(() => CouponCreateManyOfferDetailsInputSchema).array() ]),
}).strict();

export const EnterpriseUpsertWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseUpsertWithoutOfferInput> = z.object({
  update: z.union([ z.lazy(() => EnterpriseUpdateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutOfferInputSchema) ]),
  create: z.union([ z.lazy(() => EnterpriseCreateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedCreateWithoutOfferInputSchema) ]),
  where: z.lazy(() => EnterpriseWhereInputSchema).optional()
}).strict();

export const EnterpriseUpdateToOneWithWhereWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseUpdateToOneWithWhereWithoutOfferInput> = z.object({
  where: z.lazy(() => EnterpriseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EnterpriseUpdateWithoutOfferInputSchema),z.lazy(() => EnterpriseUncheckedUpdateWithoutOfferInputSchema) ]),
}).strict();

export const EnterpriseUpdateWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseUpdateWithoutOfferInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateWithoutOfferInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateWithoutOfferInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const CouponUpsertWithWhereUniqueWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUpsertWithWhereUniqueWithoutOfferDetailsInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CouponUpdateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedUpdateWithoutOfferDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => CouponCreateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedCreateWithoutOfferDetailsInputSchema) ]),
}).strict();

export const CouponUpdateWithWhereUniqueWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUpdateWithWhereUniqueWithoutOfferDetailsInput> = z.object({
  where: z.lazy(() => CouponWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CouponUpdateWithoutOfferDetailsInputSchema),z.lazy(() => CouponUncheckedUpdateWithoutOfferDetailsInputSchema) ]),
}).strict();

export const CouponUpdateManyWithWhereWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUpdateManyWithWhereWithoutOfferDetailsInput> = z.object({
  where: z.lazy(() => CouponScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CouponUpdateManyMutationInputSchema),z.lazy(() => CouponUncheckedUpdateManyWithoutOfferDetailsInputSchema) ]),
}).strict();

export const OfferCreateWithoutCouponInputSchema: z.ZodType<Prisma.OfferCreateWithoutCouponInput> = z.object({
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  enterprise: z.lazy(() => EnterpriseCreateNestedOneWithoutOfferInputSchema)
}).strict();

export const OfferUncheckedCreateWithoutCouponInputSchema: z.ZodType<Prisma.OfferUncheckedCreateWithoutCouponInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable(),
  enterpriseId: z.number().int()
}).strict();

export const OfferCreateOrConnectWithoutCouponInputSchema: z.ZodType<Prisma.OfferCreateOrConnectWithoutCouponInput> = z.object({
  where: z.lazy(() => OfferWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OfferCreateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedCreateWithoutCouponInputSchema) ]),
}).strict();

export const ClientCreateWithoutCouponsInputSchema: z.ZodType<Prisma.ClientCreateWithoutCouponsInput> = z.object({
  phone: z.string(),
  DUI: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutClientInputSchema)
}).strict();

export const ClientUncheckedCreateWithoutCouponsInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutCouponsInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string(),
  DUI: z.string(),
  userId: z.number().int()
}).strict();

export const ClientCreateOrConnectWithoutCouponsInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutCouponsInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCouponsInputSchema) ]),
}).strict();

export const OfferUpsertWithoutCouponInputSchema: z.ZodType<Prisma.OfferUpsertWithoutCouponInput> = z.object({
  update: z.union([ z.lazy(() => OfferUpdateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedUpdateWithoutCouponInputSchema) ]),
  create: z.union([ z.lazy(() => OfferCreateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedCreateWithoutCouponInputSchema) ]),
  where: z.lazy(() => OfferWhereInputSchema).optional()
}).strict();

export const OfferUpdateToOneWithWhereWithoutCouponInputSchema: z.ZodType<Prisma.OfferUpdateToOneWithWhereWithoutCouponInput> = z.object({
  where: z.lazy(() => OfferWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OfferUpdateWithoutCouponInputSchema),z.lazy(() => OfferUncheckedUpdateWithoutCouponInputSchema) ]),
}).strict();

export const OfferUpdateWithoutCouponInputSchema: z.ZodType<Prisma.OfferUpdateWithoutCouponInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterprise: z.lazy(() => EnterpriseUpdateOneRequiredWithoutOfferNestedInputSchema).optional()
}).strict();

export const OfferUncheckedUpdateWithoutCouponInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateWithoutCouponInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterpriseId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUpsertWithoutCouponsInputSchema: z.ZodType<Prisma.ClientUpsertWithoutCouponsInput> = z.object({
  update: z.union([ z.lazy(() => ClientUpdateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutCouponsInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCouponsInputSchema) ]),
  where: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientUpdateToOneWithWhereWithoutCouponsInputSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutCouponsInput> = z.object({
  where: z.lazy(() => ClientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ClientUpdateWithoutCouponsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutCouponsInputSchema) ]),
}).strict();

export const ClientUpdateWithoutCouponsInputSchema: z.ZodType<Prisma.ClientUpdateWithoutCouponsInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateWithoutCouponsInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutCouponsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DUI: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EnterpriseCreateManyCategoryInputSchema: z.ZodType<Prisma.EnterpriseCreateManyCategoryInput> = z.object({
  id: z.number().int().optional(),
  description: z.string(),
  commissionPercentage: z.number(),
  enterpriseCode: z.string(),
  location: z.string(),
  phone: z.string(),
  userId: z.number().int()
}).strict();

export const EnterpriseUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUpdateWithoutCategoryInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEnterpriseNestedInputSchema).optional(),
  Offer: z.lazy(() => OfferUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Offer: z.lazy(() => OfferUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional(),
  Employee: z.lazy(() => EmployeeUncheckedUpdateManyWithoutEnterpriseNestedInputSchema).optional()
}).strict();

export const EnterpriseUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.EnterpriseUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commissionPercentage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  enterpriseCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OfferCreateManyEnterpriseInputSchema: z.ZodType<Prisma.OfferCreateManyEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  discountPrice: z.number(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  quantityLimit: z.number().int().optional().nullable(),
  sold: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  offerState: z.lazy(() => OfferStateSchema),
  approvedAt: z.coerce.date().optional().nullable(),
  offerRejectedReason: z.string().optional().nullable()
}).strict();

export const EmployeeCreateManyEnterpriseInputSchema: z.ZodType<Prisma.EmployeeCreateManyEnterpriseInput> = z.object({
  id: z.number().int().optional(),
  phone: z.string().optional().nullable(),
  userId: z.number().int()
}).strict();

export const OfferUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUpdateWithoutEnterpriseInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Coupon: z.lazy(() => CouponUpdateManyWithoutOfferDetailsNestedInputSchema).optional()
}).strict();

export const OfferUncheckedUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Coupon: z.lazy(() => CouponUncheckedUpdateManyWithoutOfferDetailsNestedInputSchema).optional()
}).strict();

export const OfferUncheckedUpdateManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.OfferUncheckedUpdateManyWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  discountPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  validFrom: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  validUntil: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantityLimit: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sold: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  offerState: z.union([ z.lazy(() => OfferStateSchema),z.lazy(() => EnumOfferStateFieldUpdateOperationsInputSchema) ]).optional(),
  approvedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offerRejectedReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EmployeeUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUpdateWithoutEnterpriseInput> = z.object({
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEmployeeNestedInputSchema).optional()
}).strict();

export const EmployeeUncheckedUpdateWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmployeeUncheckedUpdateManyWithoutEnterpriseInputSchema: z.ZodType<Prisma.EmployeeUncheckedUpdateManyWithoutEnterpriseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponCreateManyClientInputSchema: z.ZodType<Prisma.CouponCreateManyClientInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  offerId: z.number().int()
}).strict();

export const CouponUpdateWithoutClientInputSchema: z.ZodType<Prisma.CouponUpdateWithoutClientInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerDetails: z.lazy(() => OfferUpdateOneRequiredWithoutCouponNestedInputSchema).optional()
}).strict();

export const CouponUncheckedUpdateWithoutClientInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateWithoutClientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponUncheckedUpdateManyWithoutClientInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateManyWithoutClientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  offerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponCreateManyOfferDetailsInputSchema: z.ZodType<Prisma.CouponCreateManyOfferDetailsInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  couponState: z.lazy(() => CouponStateSchema),
  clientId: z.number().int()
}).strict();

export const CouponUpdateWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUpdateWithoutOfferDetailsInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutCouponsNestedInputSchema).optional()
}).strict();

export const CouponUncheckedUpdateWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateWithoutOfferDetailsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CouponUncheckedUpdateManyWithoutOfferDetailsInputSchema: z.ZodType<Prisma.CouponUncheckedUpdateManyWithoutOfferDetailsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  couponState: z.union([ z.lazy(() => CouponStateSchema),z.lazy(() => EnumCouponStateFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const EnterpriseFindFirstArgsSchema: z.ZodType<Prisma.EnterpriseFindFirstArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereInputSchema.optional(),
  orderBy: z.union([ EnterpriseOrderByWithRelationInputSchema.array(),EnterpriseOrderByWithRelationInputSchema ]).optional(),
  cursor: EnterpriseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnterpriseScalarFieldEnumSchema,EnterpriseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EnterpriseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EnterpriseFindFirstOrThrowArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereInputSchema.optional(),
  orderBy: z.union([ EnterpriseOrderByWithRelationInputSchema.array(),EnterpriseOrderByWithRelationInputSchema ]).optional(),
  cursor: EnterpriseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnterpriseScalarFieldEnumSchema,EnterpriseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EnterpriseFindManyArgsSchema: z.ZodType<Prisma.EnterpriseFindManyArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereInputSchema.optional(),
  orderBy: z.union([ EnterpriseOrderByWithRelationInputSchema.array(),EnterpriseOrderByWithRelationInputSchema ]).optional(),
  cursor: EnterpriseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnterpriseScalarFieldEnumSchema,EnterpriseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EnterpriseAggregateArgsSchema: z.ZodType<Prisma.EnterpriseAggregateArgs> = z.object({
  where: EnterpriseWhereInputSchema.optional(),
  orderBy: z.union([ EnterpriseOrderByWithRelationInputSchema.array(),EnterpriseOrderByWithRelationInputSchema ]).optional(),
  cursor: EnterpriseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EnterpriseGroupByArgsSchema: z.ZodType<Prisma.EnterpriseGroupByArgs> = z.object({
  where: EnterpriseWhereInputSchema.optional(),
  orderBy: z.union([ EnterpriseOrderByWithAggregationInputSchema.array(),EnterpriseOrderByWithAggregationInputSchema ]).optional(),
  by: EnterpriseScalarFieldEnumSchema.array(),
  having: EnterpriseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EnterpriseFindUniqueArgsSchema: z.ZodType<Prisma.EnterpriseFindUniqueArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereUniqueInputSchema,
}).strict() ;

export const EnterpriseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EnterpriseFindUniqueOrThrowArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereUniqueInputSchema,
}).strict() ;

export const ClientFindFirstArgsSchema: z.ZodType<Prisma.ClientFindFirstArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindManyArgsSchema: z.ZodType<Prisma.ClientFindManyArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientAggregateArgsSchema: z.ZodType<Prisma.ClientAggregateArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientGroupByArgsSchema: z.ZodType<Prisma.ClientGroupByArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithAggregationInputSchema.array(),ClientOrderByWithAggregationInputSchema ]).optional(),
  by: ClientScalarFieldEnumSchema.array(),
  having: ClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientFindUniqueArgsSchema: z.ZodType<Prisma.ClientFindUniqueArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClientFindUniqueOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const EmployeeFindFirstArgsSchema: z.ZodType<Prisma.EmployeeFindFirstArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmployeeFindFirstOrThrowArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeFindManyArgsSchema: z.ZodType<Prisma.EmployeeFindManyArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmployeeScalarFieldEnumSchema,EmployeeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmployeeAggregateArgsSchema: z.ZodType<Prisma.EmployeeAggregateArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithRelationInputSchema.array(),EmployeeOrderByWithRelationInputSchema ]).optional(),
  cursor: EmployeeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmployeeGroupByArgsSchema: z.ZodType<Prisma.EmployeeGroupByArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  orderBy: z.union([ EmployeeOrderByWithAggregationInputSchema.array(),EmployeeOrderByWithAggregationInputSchema ]).optional(),
  by: EmployeeScalarFieldEnumSchema.array(),
  having: EmployeeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmployeeFindUniqueArgsSchema: z.ZodType<Prisma.EmployeeFindUniqueArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmployeeFindUniqueOrThrowArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const AdminFindFirstArgsSchema: z.ZodType<Prisma.AdminFindFirstArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AdminFindFirstOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminFindManyArgsSchema: z.ZodType<Prisma.AdminFindManyArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminAggregateArgsSchema: z.ZodType<Prisma.AdminAggregateArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminGroupByArgsSchema: z.ZodType<Prisma.AdminGroupByArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithAggregationInputSchema.array(),AdminOrderByWithAggregationInputSchema ]).optional(),
  by: AdminScalarFieldEnumSchema.array(),
  having: AdminScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminFindUniqueArgsSchema: z.ZodType<Prisma.AdminFindUniqueArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AdminFindUniqueOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const OfferFindFirstArgsSchema: z.ZodType<Prisma.OfferFindFirstArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereInputSchema.optional(),
  orderBy: z.union([ OfferOrderByWithRelationInputSchema.array(),OfferOrderByWithRelationInputSchema ]).optional(),
  cursor: OfferWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OfferScalarFieldEnumSchema,OfferScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OfferFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OfferFindFirstOrThrowArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereInputSchema.optional(),
  orderBy: z.union([ OfferOrderByWithRelationInputSchema.array(),OfferOrderByWithRelationInputSchema ]).optional(),
  cursor: OfferWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OfferScalarFieldEnumSchema,OfferScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OfferFindManyArgsSchema: z.ZodType<Prisma.OfferFindManyArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereInputSchema.optional(),
  orderBy: z.union([ OfferOrderByWithRelationInputSchema.array(),OfferOrderByWithRelationInputSchema ]).optional(),
  cursor: OfferWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OfferScalarFieldEnumSchema,OfferScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OfferAggregateArgsSchema: z.ZodType<Prisma.OfferAggregateArgs> = z.object({
  where: OfferWhereInputSchema.optional(),
  orderBy: z.union([ OfferOrderByWithRelationInputSchema.array(),OfferOrderByWithRelationInputSchema ]).optional(),
  cursor: OfferWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OfferGroupByArgsSchema: z.ZodType<Prisma.OfferGroupByArgs> = z.object({
  where: OfferWhereInputSchema.optional(),
  orderBy: z.union([ OfferOrderByWithAggregationInputSchema.array(),OfferOrderByWithAggregationInputSchema ]).optional(),
  by: OfferScalarFieldEnumSchema.array(),
  having: OfferScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OfferFindUniqueArgsSchema: z.ZodType<Prisma.OfferFindUniqueArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereUniqueInputSchema,
}).strict() ;

export const OfferFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OfferFindUniqueOrThrowArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereUniqueInputSchema,
}).strict() ;

export const CouponFindFirstArgsSchema: z.ZodType<Prisma.CouponFindFirstArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereInputSchema.optional(),
  orderBy: z.union([ CouponOrderByWithRelationInputSchema.array(),CouponOrderByWithRelationInputSchema ]).optional(),
  cursor: CouponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CouponScalarFieldEnumSchema,CouponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CouponFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CouponFindFirstOrThrowArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereInputSchema.optional(),
  orderBy: z.union([ CouponOrderByWithRelationInputSchema.array(),CouponOrderByWithRelationInputSchema ]).optional(),
  cursor: CouponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CouponScalarFieldEnumSchema,CouponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CouponFindManyArgsSchema: z.ZodType<Prisma.CouponFindManyArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereInputSchema.optional(),
  orderBy: z.union([ CouponOrderByWithRelationInputSchema.array(),CouponOrderByWithRelationInputSchema ]).optional(),
  cursor: CouponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CouponScalarFieldEnumSchema,CouponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CouponAggregateArgsSchema: z.ZodType<Prisma.CouponAggregateArgs> = z.object({
  where: CouponWhereInputSchema.optional(),
  orderBy: z.union([ CouponOrderByWithRelationInputSchema.array(),CouponOrderByWithRelationInputSchema ]).optional(),
  cursor: CouponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CouponGroupByArgsSchema: z.ZodType<Prisma.CouponGroupByArgs> = z.object({
  where: CouponWhereInputSchema.optional(),
  orderBy: z.union([ CouponOrderByWithAggregationInputSchema.array(),CouponOrderByWithAggregationInputSchema ]).optional(),
  by: CouponScalarFieldEnumSchema.array(),
  having: CouponScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CouponFindUniqueArgsSchema: z.ZodType<Prisma.CouponFindUniqueArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereUniqueInputSchema,
}).strict() ;

export const CouponFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CouponFindUniqueOrThrowArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereUniqueInputSchema,
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EnterpriseCreateArgsSchema: z.ZodType<Prisma.EnterpriseCreateArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  data: z.union([ EnterpriseCreateInputSchema,EnterpriseUncheckedCreateInputSchema ]),
}).strict() ;

export const EnterpriseUpsertArgsSchema: z.ZodType<Prisma.EnterpriseUpsertArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereUniqueInputSchema,
  create: z.union([ EnterpriseCreateInputSchema,EnterpriseUncheckedCreateInputSchema ]),
  update: z.union([ EnterpriseUpdateInputSchema,EnterpriseUncheckedUpdateInputSchema ]),
}).strict() ;

export const EnterpriseCreateManyArgsSchema: z.ZodType<Prisma.EnterpriseCreateManyArgs> = z.object({
  data: z.union([ EnterpriseCreateManyInputSchema,EnterpriseCreateManyInputSchema.array() ]),
}).strict() ;

export const EnterpriseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EnterpriseCreateManyAndReturnArgs> = z.object({
  data: z.union([ EnterpriseCreateManyInputSchema,EnterpriseCreateManyInputSchema.array() ]),
}).strict() ;

export const EnterpriseDeleteArgsSchema: z.ZodType<Prisma.EnterpriseDeleteArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  where: EnterpriseWhereUniqueInputSchema,
}).strict() ;

export const EnterpriseUpdateArgsSchema: z.ZodType<Prisma.EnterpriseUpdateArgs> = z.object({
  select: EnterpriseSelectSchema.optional(),
  include: EnterpriseIncludeSchema.optional(),
  data: z.union([ EnterpriseUpdateInputSchema,EnterpriseUncheckedUpdateInputSchema ]),
  where: EnterpriseWhereUniqueInputSchema,
}).strict() ;

export const EnterpriseUpdateManyArgsSchema: z.ZodType<Prisma.EnterpriseUpdateManyArgs> = z.object({
  data: z.union([ EnterpriseUpdateManyMutationInputSchema,EnterpriseUncheckedUpdateManyInputSchema ]),
  where: EnterpriseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EnterpriseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EnterpriseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EnterpriseUpdateManyMutationInputSchema,EnterpriseUncheckedUpdateManyInputSchema ]),
  where: EnterpriseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EnterpriseDeleteManyArgsSchema: z.ZodType<Prisma.EnterpriseDeleteManyArgs> = z.object({
  where: EnterpriseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ClientCreateArgsSchema: z.ZodType<Prisma.ClientCreateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
}).strict() ;

export const ClientUpsertArgsSchema: z.ZodType<Prisma.ClientUpsertArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
  create: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
  update: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
}).strict() ;

export const ClientCreateManyArgsSchema: z.ZodType<Prisma.ClientCreateManyArgs> = z.object({
  data: z.union([ ClientCreateManyInputSchema,ClientCreateManyInputSchema.array() ]),
}).strict() ;

export const ClientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ClientCreateManyAndReturnArgs> = z.object({
  data: z.union([ ClientCreateManyInputSchema,ClientCreateManyInputSchema.array() ]),
}).strict() ;

export const ClientDeleteArgsSchema: z.ZodType<Prisma.ClientDeleteArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateArgsSchema: z.ZodType<Prisma.ClientUpdateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateManyArgsSchema: z.ZodType<Prisma.ClientUpdateManyArgs> = z.object({
  data: z.union([ ClientUpdateManyMutationInputSchema,ClientUncheckedUpdateManyInputSchema ]),
  where: ClientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ClientUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ClientUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ClientUpdateManyMutationInputSchema,ClientUncheckedUpdateManyInputSchema ]),
  where: ClientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ClientDeleteManyArgsSchema: z.ZodType<Prisma.ClientDeleteManyArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmployeeCreateArgsSchema: z.ZodType<Prisma.EmployeeCreateArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  data: z.union([ EmployeeCreateInputSchema,EmployeeUncheckedCreateInputSchema ]),
}).strict() ;

export const EmployeeUpsertArgsSchema: z.ZodType<Prisma.EmployeeUpsertArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
  create: z.union([ EmployeeCreateInputSchema,EmployeeUncheckedCreateInputSchema ]),
  update: z.union([ EmployeeUpdateInputSchema,EmployeeUncheckedUpdateInputSchema ]),
}).strict() ;

export const EmployeeCreateManyArgsSchema: z.ZodType<Prisma.EmployeeCreateManyArgs> = z.object({
  data: z.union([ EmployeeCreateManyInputSchema,EmployeeCreateManyInputSchema.array() ]),
}).strict() ;

export const EmployeeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmployeeCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmployeeCreateManyInputSchema,EmployeeCreateManyInputSchema.array() ]),
}).strict() ;

export const EmployeeDeleteArgsSchema: z.ZodType<Prisma.EmployeeDeleteArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeUpdateArgsSchema: z.ZodType<Prisma.EmployeeUpdateArgs> = z.object({
  select: EmployeeSelectSchema.optional(),
  include: EmployeeIncludeSchema.optional(),
  data: z.union([ EmployeeUpdateInputSchema,EmployeeUncheckedUpdateInputSchema ]),
  where: EmployeeWhereUniqueInputSchema,
}).strict() ;

export const EmployeeUpdateManyArgsSchema: z.ZodType<Prisma.EmployeeUpdateManyArgs> = z.object({
  data: z.union([ EmployeeUpdateManyMutationInputSchema,EmployeeUncheckedUpdateManyInputSchema ]),
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmployeeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmployeeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmployeeUpdateManyMutationInputSchema,EmployeeUncheckedUpdateManyInputSchema ]),
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EmployeeDeleteManyArgsSchema: z.ZodType<Prisma.EmployeeDeleteManyArgs> = z.object({
  where: EmployeeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AdminCreateArgsSchema: z.ZodType<Prisma.AdminCreateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
}).strict() ;

export const AdminUpsertArgsSchema: z.ZodType<Prisma.AdminUpsertArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
  create: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
  update: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
}).strict() ;

export const AdminCreateManyArgsSchema: z.ZodType<Prisma.AdminCreateManyArgs> = z.object({
  data: z.union([ AdminCreateManyInputSchema,AdminCreateManyInputSchema.array() ]),
}).strict() ;

export const AdminCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AdminCreateManyAndReturnArgs> = z.object({
  data: z.union([ AdminCreateManyInputSchema,AdminCreateManyInputSchema.array() ]),
}).strict() ;

export const AdminDeleteArgsSchema: z.ZodType<Prisma.AdminDeleteArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminUpdateArgsSchema: z.ZodType<Prisma.AdminUpdateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminUpdateManyArgsSchema: z.ZodType<Prisma.AdminUpdateManyArgs> = z.object({
  data: z.union([ AdminUpdateManyMutationInputSchema,AdminUncheckedUpdateManyInputSchema ]),
  where: AdminWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AdminUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AdminUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AdminUpdateManyMutationInputSchema,AdminUncheckedUpdateManyInputSchema ]),
  where: AdminWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AdminDeleteManyArgsSchema: z.ZodType<Prisma.AdminDeleteManyArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OfferCreateArgsSchema: z.ZodType<Prisma.OfferCreateArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  data: z.union([ OfferCreateInputSchema,OfferUncheckedCreateInputSchema ]),
}).strict() ;

export const OfferUpsertArgsSchema: z.ZodType<Prisma.OfferUpsertArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereUniqueInputSchema,
  create: z.union([ OfferCreateInputSchema,OfferUncheckedCreateInputSchema ]),
  update: z.union([ OfferUpdateInputSchema,OfferUncheckedUpdateInputSchema ]),
}).strict() ;

export const OfferCreateManyArgsSchema: z.ZodType<Prisma.OfferCreateManyArgs> = z.object({
  data: z.union([ OfferCreateManyInputSchema,OfferCreateManyInputSchema.array() ]),
}).strict() ;

export const OfferCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OfferCreateManyAndReturnArgs> = z.object({
  data: z.union([ OfferCreateManyInputSchema,OfferCreateManyInputSchema.array() ]),
}).strict() ;

export const OfferDeleteArgsSchema: z.ZodType<Prisma.OfferDeleteArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  where: OfferWhereUniqueInputSchema,
}).strict() ;

export const OfferUpdateArgsSchema: z.ZodType<Prisma.OfferUpdateArgs> = z.object({
  select: OfferSelectSchema.optional(),
  include: OfferIncludeSchema.optional(),
  data: z.union([ OfferUpdateInputSchema,OfferUncheckedUpdateInputSchema ]),
  where: OfferWhereUniqueInputSchema,
}).strict() ;

export const OfferUpdateManyArgsSchema: z.ZodType<Prisma.OfferUpdateManyArgs> = z.object({
  data: z.union([ OfferUpdateManyMutationInputSchema,OfferUncheckedUpdateManyInputSchema ]),
  where: OfferWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OfferUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.OfferUpdateManyAndReturnArgs> = z.object({
  data: z.union([ OfferUpdateManyMutationInputSchema,OfferUncheckedUpdateManyInputSchema ]),
  where: OfferWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OfferDeleteManyArgsSchema: z.ZodType<Prisma.OfferDeleteManyArgs> = z.object({
  where: OfferWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CouponCreateArgsSchema: z.ZodType<Prisma.CouponCreateArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  data: z.union([ CouponCreateInputSchema,CouponUncheckedCreateInputSchema ]),
}).strict() ;

export const CouponUpsertArgsSchema: z.ZodType<Prisma.CouponUpsertArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereUniqueInputSchema,
  create: z.union([ CouponCreateInputSchema,CouponUncheckedCreateInputSchema ]),
  update: z.union([ CouponUpdateInputSchema,CouponUncheckedUpdateInputSchema ]),
}).strict() ;

export const CouponCreateManyArgsSchema: z.ZodType<Prisma.CouponCreateManyArgs> = z.object({
  data: z.union([ CouponCreateManyInputSchema,CouponCreateManyInputSchema.array() ]),
}).strict() ;

export const CouponCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CouponCreateManyAndReturnArgs> = z.object({
  data: z.union([ CouponCreateManyInputSchema,CouponCreateManyInputSchema.array() ]),
}).strict() ;

export const CouponDeleteArgsSchema: z.ZodType<Prisma.CouponDeleteArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  where: CouponWhereUniqueInputSchema,
}).strict() ;

export const CouponUpdateArgsSchema: z.ZodType<Prisma.CouponUpdateArgs> = z.object({
  select: CouponSelectSchema.optional(),
  include: CouponIncludeSchema.optional(),
  data: z.union([ CouponUpdateInputSchema,CouponUncheckedUpdateInputSchema ]),
  where: CouponWhereUniqueInputSchema,
}).strict() ;

export const CouponUpdateManyArgsSchema: z.ZodType<Prisma.CouponUpdateManyArgs> = z.object({
  data: z.union([ CouponUpdateManyMutationInputSchema,CouponUncheckedUpdateManyInputSchema ]),
  where: CouponWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CouponUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CouponUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CouponUpdateManyMutationInputSchema,CouponUncheckedUpdateManyInputSchema ]),
  where: CouponWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CouponDeleteManyArgsSchema: z.ZodType<Prisma.CouponDeleteManyArgs> = z.object({
  where: CouponWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;