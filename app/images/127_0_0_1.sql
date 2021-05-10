-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 28, 2021 lúc 05:19 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quangnd`
--
CREATE DATABASE IF NOT EXISTS `quangnd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `quangnd`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `branches`
--

CREATE TABLE `branches` (
  `branches_id` bigint(20) UNSIGNED NOT NULL,
  `branches_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branches_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branches_type` int(11) NOT NULL,
  `branches_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `branches`
--

INSERT INTO `branches` (`branches_id`, `branches_name`, `branches_image`, `branches_type`, `branches_code`, `created_at`, `updated_at`) VALUES
(1, 'Adidas', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-1.png?alt=media&token=208de1a1-232b-4324-bcf9-c7b0acf9e577', 1, '', '2021-01-26 02:23:39', '2021-01-26 02:23:39'),
(2, 'Nike', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-2.png?alt=media&token=b7878000-8f85-4f79-b70b-59100f43c212', 1, '', '2021-03-26 09:33:23', NULL),
(3, 'New Balance', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-3.png?alt=media&token=e9acf1de-640a-46cf-b14b-affb5039e507', 1, '', '2021-03-26 09:33:24', NULL),
(4, 'ASICS', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-4.png?alt=media&token=c182e675-722f-4679-8ac7-770b65bfd5d4', 1, '', '2021-03-26 09:33:25', NULL),
(5, 'Kering', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-5.png?alt=media&token=724824fa-75c2-4816-ac26-e97e24ac7b90', 1, '', '2021-03-26 09:33:25', NULL),
(6, 'Skechers', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-6.png?alt=media&token=f6c43946-f686-4824-8a2b-bb774a2eb0b8', 1, '', '2021-03-26 09:33:26', NULL),
(7, 'Fila', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-2.png?alt=media&token=b7878000-8f85-4f79-b70b-59100f43c212', 1, '', '2021-03-26 09:33:26', NULL),
(8, 'Bata', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-3.png?alt=media&token=e9acf1de-640a-46cf-b14b-affb5039e507', 1, '', '2021-03-26 09:33:27', NULL),
(9, 'Burberry', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-4.png?alt=media&token=c182e675-722f-4679-8ac7-770b65bfd5d4', 1, '', '2021-03-26 09:33:28', NULL),
(10, 'VF', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-5.png?alt=media&token=724824fa-75c2-4816-ac26-e97e24ac7b90', 1, '', '2021-03-26 09:33:29', NULL),
(52, 'Louis Vuitton', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbrand-2.png?alt=media&token=20373536-a101-4817-9d26-f9a4d6eae080', 1, '', '2021-03-26 03:25:51', '2021-03-26 03:25:51'),
(54, 'test1', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=eac0a3af-b764-4a44-bb34-bad4b645ad4e', 0, '', '2021-03-28 03:58:58', '2021-03-28 03:58:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` bigint(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`, `status`) VALUES
(4, 1, 39, 10, '2021-04-26 00:03:08', '2021-04-26 08:18:35', 2),
(10, 1, 11, 1, '2021-04-26 00:08:24', '2021-04-26 08:18:36', 2),
(19, 1, 3, 1, '2021-04-26 00:24:17', '2021-04-26 08:18:36', 2),
(26, 1, 3, 1, '2021-04-26 08:23:06', '2021-04-27 11:02:19', 2),
(27, 1, 3, 1, '2021-04-26 08:23:13', '2021-04-27 11:02:19', 2),
(28, 1, 3, 1, '2021-04-26 08:33:07', '2021-04-27 11:02:19', 2),
(29, 1, 6, 1, '2021-04-26 08:33:43', '2021-04-27 11:02:19', 2),
(30, 19, 3, 1, '2021-04-27 11:00:43', '2021-04-27 11:00:43', 1),
(31, 19, 3, 2, '2021-04-27 11:01:17', '2021-04-27 11:01:17', 1),
(32, 1, 9, 1, '2021-04-27 17:29:42', '2021-04-27 17:43:59', 2),
(33, 1, 9, 2, '2021-04-27 17:29:46', '2021-04-27 17:43:59', 2),
(34, 1, 16, 1, '2021-04-27 17:43:30', '2021-04-27 17:43:59', 2),
(35, 1, 9, 80, '2021-04-27 17:46:01', '2021-04-27 17:48:44', 2),
(36, 1, 11, 10, '2021-04-27 17:48:27', '2021-04-27 17:48:45', 2),
(37, 1, 11, 10, '2021-04-27 17:48:28', '2021-04-27 17:48:45', 2),
(38, 1, 39, 10, '2021-04-27 17:50:11', '2021-04-27 17:52:51', 2),
(39, 1, 27, 1, '2021-04-27 17:51:29', '2021-04-27 17:52:51', 2),
(40, 1, 39, 1, '2021-04-27 17:52:34', '2021-04-27 17:52:51', 2),
(41, 1, 10, 10, '2021-04-27 18:04:36', '2021-04-27 18:04:52', 2),
(42, 1, 11, 10, '2021-04-27 18:05:59', '2021-04-27 18:06:38', 2),
(43, 1, 10, 100, '2021-04-27 18:07:54', '2021-04-27 18:08:05', 2),
(44, 1, 6, 2, '2021-04-27 19:08:36', '2021-04-27 19:09:31', 2),
(45, 1, 6, 1, '2021-04-27 19:10:25', '2021-04-27 19:10:37', 2),
(46, 1, 6, 1, '2021-04-27 19:11:17', '2021-04-27 19:18:03', 2),
(47, 1, 6, 1, '2021-04-27 19:16:37', '2021-04-27 19:18:03', 2),
(48, 1, 6, 10, '2021-04-27 19:18:49', '2021-04-27 19:19:02', 2),
(49, 1, 6, 5, '2021-04-27 19:20:00', '2021-04-27 19:20:16', 2),
(50, 1, 6, 5, '2021-04-27 19:20:04', '2021-04-27 19:20:16', 2),
(51, 1, 6, 1, '2021-04-27 19:20:45', '2021-04-27 19:21:03', 2),
(52, 1, 6, 1, '2021-04-27 19:20:50', '2021-04-27 19:21:03', 2),
(53, 1, 6, 1, '2021-04-27 19:20:52', '2021-04-27 19:21:03', 2),
(54, 1, 5, 1, '2021-04-27 19:21:37', '2021-04-27 19:22:28', 2),
(55, 1, 5, 1, '2021-04-27 19:21:40', '2021-04-27 19:22:28', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `categories_id` bigint(20) UNSIGNED NOT NULL,
  `categories_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categories_metatitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categories_parentid` int(11) NOT NULL,
  `categories_displayorder` int(11) NOT NULL,
  `categories_showonhome` tinyint(1) NOT NULL,
  `categories_status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`categories_id`, `categories_name`, `categories_metatitle`, `categories_parentid`, `categories_displayorder`, `categories_showonhome`, `categories_status`, `created_at`, `updated_at`) VALUES
(1, 'Giày nam', 'giay-nam', 0, 1, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(2, 'Giày nữ', 'giay-nu', 0, 2, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(3, 'Dép nam', 'dep-nam', 0, 3, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(4, 'Dép nữ', 'dep-nu', 0, 4, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(5, 'Dép xỏ ngón, kẹp nữ', 'dep-xo-ngon-nu', 4, 0, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(6, 'Dép cao gót, guốc', 'dep-cao-got-nu', 4, 0, 1, 1, '2021-02-18 07:09:09', '2021-02-18 07:09:09'),
(7, 'Dép quai ngang, chéo nữ', 'dep-quai-ngang-nu', 4, 0, 1, 1, '2021-02-18 07:10:00', '2021-02-18 07:10:00'),
(8, 'Dép nhựa nam', 'dep-nhua-nam', 3, 0, 1, 1, '2021-02-18 07:10:30', '2021-02-18 07:10:30'),
(9, 'Dép bít mũi', 'dep-bit-mui-nam', 3, 0, 1, 1, '2021-02-18 07:11:05', '2021-02-18 07:11:06'),
(10, 'Dép quai ngang, chéo nam', 'dep-quai-ngang-nam', 3, 0, 1, 1, '2021-02-18 07:11:46', '2021-02-18 07:11:47'),
(11, 'Dép xỏ ngón nam', 'dep-xo-ngon-nam', 3, 0, 1, 1, '2021-02-18 07:12:11', '2021-02-18 07:12:12'),
(12, 'Giày sneaker nữ', 'giay-sneaker-nu', 2, 0, 1, 1, '2021-02-18 07:12:56', '2021-02-18 07:12:57'),
(13, 'Giày mọi, slip on nữ', 'giay-moi-nu', 2, 0, 1, 1, '2021-02-18 07:13:27', '2021-02-18 07:13:27'),
(14, 'Giày cao gót', 'giay-cao-got-nu', 2, 0, 1, 1, '2021-02-18 07:13:50', '2021-02-18 07:13:50'),
(15, 'Giày sandal nữ', 'giay-sandal-nu', 2, 0, 1, 1, '2021-02-18 07:14:19', '2021-02-18 07:14:19'),
(16, 'Giày sneaker nam', 'giay-sneaker-nam', 1, 0, 1, 0, '2021-02-18 07:14:56', '2021-02-18 07:14:57'),
(17, 'Giày nhựa nam', 'giay-nhua-nam', 1, 0, 1, 1, '2021-02-18 07:15:24', '2021-02-18 07:15:24'),
(18, 'Giày bốt nam', 'giay-bot-nam', 1, 0, 1, 1, '2021-02-18 07:15:40', '2021-02-18 07:15:40'),
(19, 'Giày lười, giày mọi nam', 'giay-luoi-nam', 1, 0, 1, 1, '2021-02-18 07:16:07', '2021-02-18 07:16:07'),
(20, 'GIày sandal nam', 'giay-sandal-nam', 1, 0, 1, 1, '2021-02-18 07:16:32', '2021-02-18 07:16:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `districts`
--

CREATE TABLE `districts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gso_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` bigint(20) UNSIGNED NOT NULL,
  `feedback_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback_comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback_rate` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `feedback_customer_id`, `feedback_comment`, `feedback_rate`, `created_at`, `updated_at`) VALUES
(1, '1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nunc eget leo finibus luctus et vitae lorem', 5, '2021-03-12 14:25:39', '2021-03-12 14:25:40'),
(2, '3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nunc eget leo finibus luctus et vitae lorem', 4, '2021-03-17 04:46:51', '2021-03-17 04:46:52'),
(3, '4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nunc eget leo finibus luctus et vitae lorem', 5, '2021-03-17 06:47:58', '2021-03-17 06:47:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedbackproduct`
--

CREATE TABLE `feedbackproduct` (
  `id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `images` longtext NOT NULL,
  `rate` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menus`
--

CREATE TABLE `menus` (
  `menus_id` bigint(20) UNSIGNED NOT NULL,
  `menus_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menus_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menus_css` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `menus`
--

INSERT INTO `menus` (`menus_id`, `menus_name`, `menus_path`, `menus_css`, `created_at`, `updated_at`) VALUES
(1, 'Tài khoản', '/tai-khoan', '', NULL, NULL),
(2, 'Sản phẩm', '/san-pham', '', NULL, NULL),
(3, 'Nhóm sản phẩm', '/nhom-san-pham', '', NULL, NULL),
(4, 'Đơn hàng', '/don-hang', '', NULL, NULL),
(5, 'Thương hiệu', '/thuong-hieu', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(136, '2021_01_16_041736_create_feedback_table', 1),
(137, '2021_01_16_042418_create_users_table', 1),
(138, '2021_01_16_043112_create_products_table', 1),
(139, '2021_01_16_043256_create_branches_table', 1),
(140, '2021_01_16_043441_create_orders_table', 1),
(141, '2021_01_16_043548_create_categories_table', 1),
(142, '2021_01_20_032159_create_menus_table', 1),
(143, '2021_01_21_065903_create_roles_table', 1),
(144, '2021_01_21_071416_create_modules_table', 1),
(145, '2021_01_26_064655_create_product_sizes_table', 1),
(146, '2021_04_23_022729_create_shipplace_table', 2),
(147, '2020_01_01_000001_create_provinces_table', 3),
(148, '2020_01_01_000002_create_districts_table', 4),
(149, '2020_01_01_000003_create_wards_table', 5),
(150, '2021_04_26_022629_create_carts_table', 6),
(151, '2021_04_27_102607_create_news_table', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `modules`
--

CREATE TABLE `modules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `review` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `review`, `body`, `image`, `created_at`, `updated_at`) VALUES
(2, 'Việt Nam vững vàng trước Covid19', 'Quả là thành tựu vĩ đại của Đảng và nhân dân Việt Nam', '<p>Việt Nam trong tim tôi</p>\n<p><img src=\"https://anhdepblog.com/wp-content/uploads/2018/08/anh-la-co-viet-nam-dep-1.png\" alt=\"Quốc kì Việt Nam\" style=\"width: 182px; height: 121px;\"></p>\n<p><br></p>', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2FScreenshot%202021-02-17%20141148.png?alt=media&token=60b1b453-690e-4bc4-a005-8d729d441b88', '2021-04-27 10:45:45', '2021-04-27 10:45:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `orders_id` bigint(20) UNSIGNED NOT NULL,
  `product_size_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `shipplace_id` int(255) NOT NULL,
  `orders_status` tinyint(1) NOT NULL,
  `orders_quantity` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `orders_type` bigint(255) DEFAULT NULL,
  `product_cost` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`orders_id`, `product_size_id`, `user_id`, `shipplace_id`, `orders_status`, `orders_quantity`, `product_price`, `created_at`, `updated_at`, `orders_type`, `product_cost`) VALUES
(3, 39, 1, 9, 2, 10, 69000, '2021-04-26 08:08:14', '2021-04-26 08:08:14', 2, 60000),
(4, 11, 1, 9, 3, 1, 220000, '2021-04-26 08:08:14', '2021-04-26 08:08:14', 2, 160000),
(5, 3, 1, 9, 2, 1, 69000, '2021-04-26 08:08:14', '2021-04-26 08:08:14', 2, 60000),
(6, 39, 1, 9, 2, 10, 69000, '2021-04-26 08:10:02', '2021-04-26 08:10:02', 2, 60000),
(7, 11, 1, 9, 3, 1, 220000, '2021-04-26 08:10:02', '2021-04-26 08:10:02', 2, 160000),
(8, 3, 1, 9, 3, 1, 69000, '2021-04-26 08:10:02', '2021-04-26 08:10:02', 2, 60000),
(9, 39, 1, 9, 1, 10, 69000, '2021-04-26 08:18:35', '2021-04-26 08:18:35', 2, 60000),
(10, 11, 1, 9, 3, 1, 220000, '2021-04-26 08:18:35', '2021-04-26 08:18:35', 2, 160000),
(11, 3, 1, 9, 3, 1, 69000, '2021-04-26 08:18:35', '2021-04-26 08:18:35', 2, 60000),
(12, 3, 1, 9, 1, 1, 69000, '2021-04-27 11:02:18', '2021-04-27 11:02:18', 2, 60000),
(13, 3, 1, 9, 1, 1, 69000, '2021-04-27 11:02:18', '2021-04-27 11:02:18', 2, 60000),
(14, 3, 1, 9, 1, 1, 69000, '2021-04-27 11:02:19', '2021-04-27 11:02:19', 2, 60000),
(15, 6, 1, 9, 1, 1, 600000, '2021-04-27 11:02:19', '2021-04-27 11:02:19', 2, 500000),
(16, 9, 1, 7, 1, 1, 300000, '2021-04-27 17:43:59', '2021-04-27 17:43:59', 2, 240000),
(17, 9, 1, 7, 1, 2, 300000, '2021-04-27 17:43:59', '2021-04-27 17:43:59', 2, 240000),
(18, 16, 1, 7, 1, 1, 99000, '2021-04-27 17:43:59', '2021-04-27 17:43:59', 2, 80000),
(19, 9, 1, 9, 1, 80, 300000, '2021-04-27 17:48:44', '2021-04-27 17:48:44', 2, 240000),
(20, 11, 1, 9, 1, 10, 220000, '2021-04-27 17:48:44', '2021-04-27 17:48:44', 2, 160000),
(21, 11, 1, 9, 1, 10, 220000, '2021-04-27 17:48:44', '2021-04-27 17:48:44', 2, 160000),
(22, 39, 1, 9, 1, 10, 69000, '2021-04-27 17:52:51', '2021-04-27 17:52:51', 2, 60000),
(23, 27, 1, 9, 1, 1, 69000, '2021-04-27 17:52:51', '2021-04-27 17:52:51', 2, 60000),
(24, 39, 1, 9, 1, 1, 69000, '2021-04-27 17:52:51', '2021-04-27 17:52:51', 2, 60000),
(25, 10, 1, 9, 1, 10, 350000, '2021-04-27 18:04:52', '2021-04-27 18:04:52', 2, 280000),
(26, 11, 1, 9, 1, 10, 220000, '2021-04-27 18:06:38', '2021-04-27 18:06:38', 2, 160000),
(27, 10, 1, 9, 1, 100, 350000, '2021-04-27 18:08:05', '2021-04-27 18:08:05', 2, 280000),
(28, 6, 1, 9, 1, 2, 600000, '2021-04-27 19:09:31', '2021-04-27 19:09:31', 2, 500000),
(29, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:10:37', '2021-04-27 19:10:37', 2, 500000),
(30, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:18:02', '2021-04-27 19:18:02', 2, 500000),
(31, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:18:03', '2021-04-27 19:18:03', 2, 500000),
(32, 6, 1, 9, 1, 10, 600000, '2021-04-27 19:19:01', '2021-04-27 19:19:01', 2, 500000),
(33, 6, 1, 9, 1, 5, 600000, '2021-04-27 19:20:16', '2021-04-27 19:20:16', 2, 500000),
(34, 6, 1, 9, 1, 5, 600000, '2021-04-27 19:20:16', '2021-04-27 19:20:16', 2, 500000),
(35, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:21:03', '2021-04-27 19:21:03', 2, 500000),
(36, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:21:03', '2021-04-27 19:21:03', 2, 500000),
(37, 6, 1, 9, 1, 1, 600000, '2021-04-27 19:21:03', '2021-04-27 19:21:03', 2, 500000),
(38, 5, 1, 9, 3, 1, 49000, '2021-04-27 19:22:27', '2021-04-27 19:22:27', 2, 40000),
(39, 5, 1, 9, 3, 1, 49000, '2021-04-27 19:22:28', '2021-04-27 19:22:28', 2, 40000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `size_id` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_metatitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_more_image` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_promotion` int(11) NOT NULL,
  `product_includedvat` tinyint(1) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  `product_detail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_status` tinyint(1) NOT NULL,
  `product_viewcount` int(11) NOT NULL,
  `product_rate` double NOT NULL DEFAULT 0,
  `product_material` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_size` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `size_id`, `product_name`, `product_code`, `product_metatitle`, `product_description`, `product_more_image`, `product_image`, `product_promotion`, `product_includedvat`, `product_price`, `product_quantity`, `product_category_id`, `product_detail`, `product_status`, `product_viewcount`, `product_rate`, `product_material`, `product_size`, `created_at`, `updated_at`, `sex`) VALUES
(21, 0, 'Latoma TA024', '1', 'latoma-ta024', 'Dép xỏ ngón nữ thời trang đính hoa cao cấp Latoma TA024 Là phái đẹp ,ai cũng muốn được xinh tươi, trẻ trung.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=cfb89823-d67c-41ad-83d3-1db2c8a41d98', 60000, 1, 69000, 400, 5, 'NULL', 1, 0, 5, 'Cao su', '0', '2021-03-23 21:28:33', '2021-03-23 21:28:33', 1),
(22, 0, 'Latoma TA034', '2', 'latoma-ta034', 'Dép xỏ ngón nữ họa tiết thổ cẩm thời trang cao cấp Latoma TA034 Là phái đẹp ,ai cũng muốn được xinh tươi, trẻ trung', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon3.jpg?alt=media&token=bd2a2c6c-124c-4f70-b40d-8aff1fa1259b', 60000, 1, 69000, 200, 5, 'NULL', 1, 0, 5, 'Cao su', '0', '2021-03-23 21:29:13', '2021-03-23 21:29:13', 1),
(23, 0, 'Mossono AG17W', '3', 'mossono-ag17w', 'Dép kẹp nữ Mossono Mã sản phẩm: AG17W Chất liệu: Quai vải + đế nhựa mềm, nhẹ Màu:Kem,Xám Size:36,37,38,39 Thương hiệu: Mossono Xuất xứ: Thailand', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon4.jpg?alt=media&token=f2a4d096-8003-477a-9c0e-d458a39db17e', 20000, 1, 29000, 200, 5, 'NULL', 1, 0, 5, 'Cao su', '0', '2021-03-23 21:29:59', '2021-03-23 21:29:59', 1),
(24, 0, 'Dép kẹp nữ Thái Lan AP5961', '4', 'dep-kep-thai-lan-ap5961', 'Dép kẹp nữ Thái Lan mang đến sự quý phái và sang trọng cho các chị em phái đẹp.', 'a:1:{i:0;a:7:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";i:6;s:156:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdep-kep-nu-thai-lan.jpg?alt=media&token=6148f26a-5ed5-432c-b93d-3d2f92ed23ad\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdep-kep-nu-thai-lan.jpg?alt=media&token=6dd98e88-cd62-4364-a0cf-f563f39edb0a', 40000, 1, 49000, 200, 5, 'NULL', 1, 0, 5, 'Cao su', '0', '2021-03-23 21:30:40', '2021-03-23 21:30:40', 1),
(25, 0, 'VNXK Zara Basic CG071.DE.38', '5', 'zara-basic-cg071de38', 'Dòng sản phẩm xuất khẩu cao cấp của zara với nét đẹp quý phái và sang trọng là sự lựa chọn tuyệt vời cho các bạn gái', 'a:1:{i:0;a:8:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";i:6;s:156:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdep-kep-nu-thai-lan.jpg?alt=media&token=6148f26a-5ed5-432c-b93d-3d2f92ed23ad\";i:7;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fzara-de-38.jpg?alt=media&token=74745176-382f-4e97-8907-152439e32464\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fzara-de-38.jpg?alt=media&token=822f1028-5e97-407c-a6c0-d2729ef80faa', 500000, 1, 600000, 200, 6, 'NULL', 1, 0, 5, 'Da lộn', '0', '2021-03-23 21:31:52', '2021-03-23 21:31:52', 1),
(26, 0, 'Latoma TA079', '6', 'latoma-ta079', 'Dép xỏ ngón nữ thời trang cao cấp Latoma TA079 Là phái đẹp ,ai cũng muốn được xinh tươi, trẻ trung.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 60000, 1, 69000, 100, 5, 'NULL', 1, 0, 5, 'Cao su', '', '2021-03-23 21:32:54', '2021-03-23 21:32:54', 1),
(27, 0, 'Dép guốc cao gót nữ quai tết', '7', 'dep-guoc-cao-got-nu-dc4', 'Dép guốc cao gót nữ quai tết đế 7p siêu xinh là sự lựa chọn lý tưởng cho bạn gái thích phong cách đơn giản nhẹ nhàng, xinh xắn nhưng không kém phần sang trọng', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 150000, 1, 200000, 100, 6, 'NULL', 1, 0, 5, 'Cao su', '', '2021-03-23 21:34:11', '2021-03-23 21:34:11', 1),
(28, 0, 'Guốc nữ quai mảnh gót nhọn', '8', 'guoc-nu-quai-manh-n54', 'Guốc cao gót 5cm quai mảnh gót nhọn - Mẫu guốc nữ thời trang Mã sản phẩm: N54 Loại: Guốc nữ Màu sắc: Trắng, Vàng Size: 35 - 36 - 37 - 38', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 240000, 1, 300000, 100, 6, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:35:12', '2021-03-23 21:35:12', 1),
(29, 0, 'Vasmono V015022', '9', 'vasmono-v015022', 'Được sử dụng chất liệu da tổng hợp bền đẹp, lớp lót chân bằng cao su mềm cực kỳ êm chân, đường may tỉ mỉ, form giày chuẩn, độ bền cao cũng như cảm giác thoải mái cho bạn gái khi mang. Bên cạnh đó, sản phẩm guốc cao gót Vasmono có kiểu dáng hiện đại, thời trang vừa tôn dáng bạn gái, vừa dễ dàng di chuyển và mix đồ, giúp tôn vinh đôi chân của phái nữ, thiết kế với đường may tinh tế, khoe tối đa đôi chân ngọc ngà của nữ giới. Đế giày bền, đẹp, thoải mái khi di chuyển.', 'a:1:{i:0;a:9:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";i:6;s:156:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdep-kep-nu-thai-lan.jpg?alt=media&token=6148f26a-5ed5-432c-b93d-3d2f92ed23ad\";i:7;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fzara-de-38.jpg?alt=media&token=74745176-382f-4e97-8907-152439e32464\";i:8;s:152:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fvasmono-v015022.jpg?alt=media&token=246c81ff-5654-440b-9f61-749981a45893\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fvasmono-v015022.jpg?alt=media&token=43f13c1c-1aef-419b-b70f-fbc037dcd2ca', 280000, 1, 350000, 200, 6, 'NULL', 1, 0, 5, 'Nhựa PVC', '0', '2021-03-23 21:36:43', '2021-03-23 21:36:43', 1),
(30, 0, 'DorisErica G01', '10', 'doriserica-g01', 'Sản phẩm vô cùng chất lượng, mẫu mã đẹp', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 160000, 1, 220000, 100, 6, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:38:15', '2021-03-23 21:38:15', 1),
(31, 0, 'Dép quai ngang bánh mì nữ', '52', 'dep-quai-ngang-banh-mi-nu', 'Mẫu mới nhất hiện nay, Phù hợp với mọi lứa tuổi, Mang êm nhẹ nhàng chân, Rửa nước thoải mái nhé các bạn, Chất liệu cao su non tổng hợp', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 50000, 1, 70000, 100, 7, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:39:19', '2021-03-23 21:39:19', 1),
(32, 0, 'Dép quai ngang chữ H', '54', 'dep-quai-ngang-chu-h', 'Mẫu mới nhất hiện nay, Phù hợp với mọi lứa tuổi, Mang êm nhẹ nhàng chân, Rửa nước thoải mái nhé các bạn, Chất liệu cao su non tổng hợp', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 65000, 1, 99000, 100, 7, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:39:56', '2021-03-23 21:39:56', 1),
(33, 0, 'Latoma TA059', '1', 'latoma-ta059', 'Dép quai ngang nữ mặt cười thời trang cao cấp Latoma TA059 Là phái đẹp ,ai cũng muốn được xinh tươi, trẻ trung.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 40000, 1, 69000, 100, 7, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:40:35', '2021-03-23 21:40:35', 1),
(34, 0, 'Anta 82926915', '1', 'anta-82926915', 'Sản phẩm vô cùng chất lượng đến từ thương hiệu Anta', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 400000, 1, 499000, 100, 7, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:41:15', '2021-03-23 21:41:15', 1),
(35, 0, 'DAS YEEZY SLIDE KAW', '1', 'das-yeezy-slide-kaw', 'Chất liệu EVA siêu nhẹ, đế dép mềm, mịn, êm, mang phong cách sành điệu, đi nước thoải mái, rất dễ làm sạch, form luôn có phong cách riêng, cực kỳ nổi bật, dáng đế xuồng', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 80000, 1, 99000, 100, 7, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:42:59', '2021-03-23 21:42:59', 1),
(36, 0, 'Leedo EVA 084 KN', '1', 'leedo-eva-084-kn', 'Dép nhựa đi mưa nam Leedo hai quai màu kem nâu EVA 084 KN có thiết kế hai quai ngang với phần quai to bản chắc chắn. Phần mặt đế và đế được xẻ rãnh chống trơn trượt, bạn không cần lo lắng bị trượt ngã trong những ngày mưa. Thiết kế chống thấm nước đảm bảo độ bền của dép lâu dài.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 80000, 1, 99000, 100, 8, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:49:57', '2021-03-23 21:49:57', 2),
(37, 0, 'Latoma TA071', '1', 'latoma-ta071', 'Giày dép luôn là một phần không thể thiếu trong cuộc sống hằng ngày.Những mẫu giày,dép cho nam không có quá nhiều mẫu mã bằng các kiểu giày dép cho nữ giới nhưng lại có khả năng tạo điểm nhấn đặc biệt. .Sản phẩm Dép xỏ ngón nam Sport thời trang Latoma TA071 với thiết kế đơn giản cùng với phong cách thời trang năng động sẽ giúp các chàng trai trở nên nổi bật hơn,cá tính hơn.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 30000, 1, 49000, 100, 8, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:50:50', '2021-03-23 21:50:50', 2),
(38, 0, 'Crocs Duet Max', '1', 'crocs-duet-max', 'Chất nhẹ thoải mái, quai sau dễ mang tháo, đệm lót êm ái', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 120000, 1, 149000, 100, 8, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:51:28', '2021-03-23 21:51:28', 2),
(39, 0, 'ADILETTE AQUA', '1', 'adilette-aqua', 'Hãy đi mẫu dép có thể đi trong lúc tắm này để làm sạch sau khi tập bơi. Với kiểu dáng đơn giản, mẫu dép kiểu slip-on mềm mại này thể hiện chất gen của adidas với 3 Sọc Kẻ đặc trưng. Lớp đệm mềm thư giãn đôi chân mệt mỏi bằng sự thoải mái sang trọng.Hãy đi mẫu dép có thể đi trong lúc tắm này để làm sạch sau khi tập bơi. Với kiểu dáng đơn giản, mẫu dép kiểu slip-on mềm mại này thể hiện chất gen của adidas với 3 Sọc Kẻ đặc trưng. Lớp đệm mềm thư giãn đôi chân mệt mỏi bằng sự thoải mái sang trọng.', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 450000, 1, 499000, 100, 8, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:52:06', '2021-03-23 21:52:06', 2),
(40, 0, 'Adda 3TD12M', '1', 'data-3td12m', 'Quai ngang, đế 2 lớp, đế ngoài bằng nhựa cứng và bền đàm bảo cho bạn bước đi ổn định và an toàn hơn, đế trong mềm và cấu tạo khuếch tán', 'a:1:{i:0;a:6:{i:0;s:147:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e\";i:1;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam1.jpg?alt=media&token=30ccf4df-a99d-49f3-8eb4-2032b63c1b83\";i:2;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam3.jpg?alt=media&token=be58e2c6-6137-4541-993d-01992027eee3\";i:3;s:144:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fbotnam5.jpg?alt=media&token=68bb67ea-134d-4962-99a1-9e1c2d2c5151\";i:4;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam2.jpg?alt=media&token=e3f305bd-b850-419c-b78b-affda909b16e\";i:5;s:148:\"https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepnhuanam1.jpg?alt=media&token=6dd0fab7-f7ba-4414-9e73-0d330b465431\";}}', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Fdepxongon1.jpg?alt=media&token=dbdb1aba-5e6c-4cd6-b71b-d5ec5bc6445e', 210000, 1, 299000, 100, 8, 'NULL', 1, 0, 5, 'Nhựa PVC', '', '2021-03-23 21:56:21', '2021-03-23 21:56:21', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_sizes`
--

CREATE TABLE `product_sizes` (
  `size_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `size_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_sizes`
--

INSERT INTO `product_sizes` (`size_id`, `product_id`, `color`, `size_name`, `product_count`, `created_at`, `updated_at`) VALUES
(3, 22, 'Đen', '40', 96, '2021-03-29 03:18:15', '2021-03-31 21:04:19'),
(4, 23, 'Đen', '40', 100, '2021-03-29 03:19:58', '2021-03-29 03:19:59'),
(5, 24, 'Trắng', '41', 100, '2021-03-29 03:20:30', '2021-03-29 03:20:31'),
(6, 25, 'Đen', '42', 71, '2021-03-29 03:20:48', '2021-03-29 03:20:48'),
(7, 26, 'Đen', '43', 100, '2021-03-29 03:21:06', '2021-03-29 03:21:06'),
(8, 27, 'Đen', '38', 100, '2021-03-29 03:21:43', '2021-03-29 03:21:44'),
(9, 28, 'Trắng', '39', 17, '2021-03-29 03:22:02', '2021-03-29 03:22:02'),
(10, 29, 'Trắng', '39', 890, '2021-03-29 03:22:24', '2021-03-29 03:22:24'),
(11, 30, 'Đen', '39', 69, '2021-03-29 03:22:48', '2021-03-29 03:22:48'),
(12, 31, 'Nâu', '39', 100, '2021-03-29 03:23:34', '2021-03-29 03:23:34'),
(13, 32, 'Nâu', '39', 100, '2021-03-29 03:23:46', '2021-03-29 03:23:46'),
(14, 33, 'Đen', '39', 100, '2021-03-29 03:23:59', '2021-03-29 03:23:59'),
(15, 34, 'Trắng', '39', 100, '2021-03-29 03:24:12', '2021-03-29 03:24:15'),
(16, 35, 'Vàng', '40', 97, '2021-03-29 03:24:34', '2021-03-29 03:24:35'),
(17, 36, 'Vàng', '40', 100, '2021-03-29 03:24:56', '2021-03-29 03:24:57'),
(18, 37, 'Đen', '40', 100, '2021-03-29 03:25:12', '2021-03-29 03:25:12'),
(19, 38, 'Trắng', '40', 100, '2021-03-29 03:25:28', '2021-03-29 03:25:28'),
(20, 39, 'Trắng', '40', 100, '2021-03-29 03:25:41', '2021-03-29 03:25:41'),
(21, 40, 'Đen', '40', 100, '2021-03-29 03:26:04', '2021-03-29 03:26:04'),
(27, 21, 'Cam', '40', 99, '2021-03-31 21:53:32', '2021-03-31 21:53:32'),
(28, 22, 'Vàng', '40', 100, '2021-03-31 21:53:47', '2021-03-31 21:53:47'),
(29, 22, 'Đen', '39', 100, '2021-03-31 21:53:56', '2021-03-31 21:53:56'),
(30, 21, 'Vàng', '40', 100, '2021-03-31 21:54:28', '2021-03-31 21:54:28'),
(31, 21, 'Đen', '39', 100, '2021-03-31 21:54:56', '2021-03-31 21:54:56'),
(32, 21, 'Trắng', '39', 200, '2021-03-31 21:55:08', '2021-04-01 20:04:42'),
(39, 21, 'Cam', '39', 168, '2021-04-04 14:18:18', '2021-04-04 14:18:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `provinces`
--

CREATE TABLE `provinces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gso_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `roles_id` bigint(20) UNSIGNED NOT NULL,
  `roles_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`roles_id`, `roles_name`) VALUES
(1, 'Admin'),
(2, 'Mod'),
(3, 'Client');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipplace`
--

CREATE TABLE `shipplace` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shipplace`
--

INSERT INTO `shipplace` (`id`, `user_id`, `address`, `default`, `created_at`, `updated_at`) VALUES
(2, '19', 'Hà Nội', 0, '2021-04-23 10:52:17', '2021-04-23 10:52:18'),
(3, '19', 'Bắc Ninh', 0, '2021-04-23 11:03:48', '2021-04-23 11:03:49'),
(4, '1', 'Nguyên Xá Minh Khai Bắc Từ Liêm Hà Nội', 0, '2021-04-23 14:44:35', '2021-04-23 14:44:37'),
(7, '1', 'Song Hồ Thuận Thành Bắc Ninh', 0, '2021-04-24 03:39:21', '2021-04-24 03:39:24'),
(8, '10', 'Hưng Yên', 1, '2021-04-23 20:54:42', '2021-04-23 20:54:42'),
(9, '1', '125 Hoàng Ngân Trung Hòa Cầu Giấy Hà Nội', 1, '2021-04-24 07:17:23', '2021-04-24 07:17:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupid` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `about_me` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hash` int(11) NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `like_web` tinyint(4) DEFAULT NULL,
  `user_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `groupid`, `name`, `address`, `email`, `birthday`, `about_me`, `background_image`, `hash`, `phone`, `token`, `status`, `created_at`, `updated_at`, `like_web`, `user_image`, `sex`) VALUES
(1, 'quangnd', 'fd03b8c63f1df276b1221d62ed0996cf', 1, 'Nguyễn Đắc Quang', 'Bắc Ninh', 'quangnd@gmail2.com', '2021-04-23', 'Quang Nè', 'https://via.placeholder.com/400x200', 25568, '0987654321', '91519968dfbfa3d792f90f21b073034f', 1, '2021-01-26 00:12:09', '2021-04-22 19:04:36', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2F5555954441582960203-128.png?alt=media&token=b8d37faf-9871-452f-9e1c-5dd02966e793', 3),
(3, 'duynd', 'e9d175e2282885ee5209da386790170e', 2, 'Nguyễn Đắc Duy', 'Bắc Ninh', 'ndduy@gmail.com', '0000-00-00', NULL, '', 17651, '0988777833', '92e895c3d7871ae98fa4a0f08afe0b5f', 0, '2021-02-14 20:22:41', '2021-02-14 20:22:41', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 1),
(4, 'hungdh', '2b180e3e14272809380100554fac6ab5', 3, 'Dương Hữu Hùng', 'Bắc Ninh', 'hungdh@gmail.com', '0000-00-00', NULL, '', 35699, '0984683134', '9ac880ea4c8f8599ec1bf62698c5d53b', 1, '2021-02-14 20:24:00', '2021-02-14 20:24:00', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(5, 'hungld', '6aa44d0a481b8790d515ce91a90aa842', 2, 'Lê Doãn Hưng', 'Bắc Ninh', 'hungld@gmail.com', '0000-00-00', NULL, '', 61272, '0988777832', 'e93933924e22d68f5f5732c672dc323d', 1, '2021-02-14 20:27:17', '2021-02-14 20:27:17', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 2),
(6, 'huync', '407dfc9fecfe3b7d2c690926cd673a35', 2, 'Nguyễn Công Huy', 'Bắc Ninh', 'huync@gmail.com', '1999-08-20', 'No problem', '', 91254, '0984683131', '184c4b2fc40847298c44d2599bf04585', 1, '2021-02-14 20:28:10', '2021-04-21 20:04:24', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2FScreenshot%202021-02-17%20141148.png?alt=media&token=c67a9d5f-5280-4e4d-81e9-c00b3ec81083', 1),
(7, 'thangln', '599c173c8e9c27d1ba866bdd7bc0681b', 2, 'Lê Nho Thắng', 'Bắc Ninh', 'thangln@gmail.com', '0000-00-00', NULL, '', 30677, '0987567876', '36d2a7f57d549385a6af4065cd3a81bb', 1, '2021-02-17 01:15:34', '2021-02-17 01:15:34', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(8, 'thanhpd', 'b79d0079fabda80e289708e2892ec574', 2, 'Phùng Đình Thanh', 'Bắc Ninh', 'thanhpd@gmail.com', '0000-00-00', NULL, '', 91843, '0987234543', '05266aaaef281af94b3491d5f1ed16e8', 1, '2021-02-17 01:17:10', '2021-02-17 01:17:10', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(9, 'cuongnh', 'f70e00b92c7d130a3532def40036215e', 2, 'Nguyễn Hữu Cường', 'Bắc Ninh', 'cuongnh@gmail.com', '0000-00-00', NULL, '', 37356, '0987876345', '57b29e3981bf035ada67e9b22ad23738', 1, '2021-02-17 01:19:08', '2021-02-17 01:19:08', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(10, 'duongpv', '437c51955dbdc16008025703369e3f97', 2, 'Phạm Văn Dương', 'Bắc Ninh', 'duongpv@gmail.com', '0000-00-00', NULL, '', 29437, '0987345123', '2e725420e6f267696b5865c3e4f720b3', 1, '2021-02-17 01:55:09', '2021-02-17 01:55:09', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(12, 'thuynt', '1dc761653c9c95c825dbd5c635a82d06', 3, 'Nguyễn Thị Thủy', 'Bắc Ninh', 'thuynt@gmail.com', '0000-00-00', NULL, '', 63957, '0967713505', '6d3f26f5f824c65a06ee9c2aa78f19cf', 1, '2021-02-17 02:00:51', '2021-02-17 02:00:51', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(13, 'thuylt', '053096408bc93078846298e6ecbf2010', 3, 'Lê Thị Thúy', 'Bắc Ninh', 'thuylt@gmail.com', '0000-00-00', NULL, '', 10922, '0987456444', 'c4e57796960019522dc8999e443155c8', 1, '2021-02-17 02:03:27', '2021-02-17 02:03:27', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 0),
(14, 'anhph', 'de1ce48a1ef57f1a7a373d328aa1ff06', 1, 'Phạm Hồng Anh', 'Bắc Ninh', 'anhph@gmail.com', '2004-07-06', 'Cute phô mai que <3', '', 92065, '0987888999', '89568ed110704ddfd88abb16589367f3', 1, '2021-02-17 02:16:10', '2021-04-21 21:04:34', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 1),
(15, 'quandh', 'a0587f63d5c0276b2019712c8a6e2b9d', 2, 'Đỗ Hồng Quân', 'Ninh Bình', 'quandh@gmail.com', '0000-00-00', NULL, '', 73708, '0989998662', 'd46e0a948fa4ffe038c6aeac62031c4f', 1, '2021-02-17 02:45:49', '2021-02-17 02:45:49', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 2),
(16, 'quannd', '24444d63d0f65cd211da6c911b391960', 3, 'Nguyễn Đức Quân', 'Bắc Ninh', 'quannd@gmail.com', '0000-00-00', NULL, '', 17112, '0967774323', '5b0aaa851b8ef5ab4a4be34e395a64cb', 1, '2021-02-17 02:46:44', '2021-02-17 02:46:44', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 2),
(17, 'liemtq', '46264989fde16bcba6aa46d36f064611', 3, 'Trần Quốc Liêm', 'Bắc Ninh', 'liemtq@gmail.com', '0000-00-00', NULL, '', 55512, '0988777666', 'a7f1f8d5e3c162188f9a8b8fabcb6a99', 1, '2021-02-17 02:48:26', '2021-02-17 02:48:26', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 2),
(18, 'ducdp', '6a841285c85b31e0e5441842316b6af2', 3, 'Đàm Phương Đức', 'Bắc Ninh', 'ducdp@gmail.com', '0000-00-00', NULL, '', 39078, '0978388332', 'f2191d614a8f3fd1ccb00c9a74ba9845', 1, '2021-02-17 02:52:41', '2021-02-17 02:52:41', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 2),
(19, 'admin', '89b64ed7394ad42e1e12932eac7e4021', 1, 'Admin', 'Hà Nội', 'admin@gmail.com', '2021-04-23', 'Mình là mod nè', 'https://via.placeholder.com/400x200', 27444, '0988999666', '5a9ec9d8f601df043e574a859164f197', 1, '2021-02-17 08:52:22', '2021-04-22 19:04:08', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Favatar.png?alt=media&token=9c491178-a1cb-4fb0-95fd-232394097ac7', 3),
(20, 'thanhlm', '0c77b8ba51d65d2740b8cf27ee8a52ea', 3, 'Lương Minh Thành', 'Thanh Hóa', 'thanhlm@gmail.com', '2021-04-04', NULL, 'https://via.placeholder.com/400x200', 23481, '0999934444', '12f8f0409b97692ffb53c0ae3fd7282e', 1, '2021-02-17 19:14:44', '2021-04-04 05:04:25', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Faqua_geometry_abstract_background_6816196.jpg?alt=media&token=72f025bc-8ce4-4900-a106-b202cfec3dd3', 2),
(23, 'test', '68d8ac04d5c919891cada8ddcb9a38d6', 2, 'Test', 'Hà Nội', 'test@gmail.com', '2021-04-02', 'I am bad boy ~))', 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2FbackgroundSingin.jpg?alt=media&token=87307f81-c743-476b-86ff-089bb798979f', 83934, '0978654231', 'a01fe2f001eb1920cf505825b16ef2c2', 1, '2021-04-01 21:42:18', '2021-04-22 19:04:58', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2F5555954441582960203-128.png?alt=media&token=a0d1516c-0a90-47a0-9ea2-87e3173d5d7e', 3),
(24, 'anhph', 'e69c2f7692af91241649c20499bf48a5', 3, 'Phạm Hồng Anh', 'Hưng Yên', 'anhph@gmail.vn', '2021-04-23', NULL, 'https://via.placeholder.com/400x200', 47609, '0967713501', '3cc7f6a88293d38b229a48d2db101c51', 1, '2021-04-07 07:48:03', '2021-04-22 19:04:19', NULL, 'https://via.placeholder.com/100x100', 3),
(25, 'hehehe', '1f4662d7e9660e2a840b5bdca17a3ac8', 3, 'Nguyễn Đắc Quang', 'Hải Dương', 'ndquangtt1@gmail.com', '2021-04-23', 'Chào các bạn!', 'https://via.placeholder.com/400x200', 88994, '0967713509', '09d6e66d838be2091c107c053cc0006e', 1, '2021-04-09 21:26:54', '2021-04-22 19:04:57', NULL, 'https://via.placeholder.com/100x100', 3),
(26, 'tubha', '82a5aa8f38df7d2c32a107e95f37f53b', 3, 'Bùi Hữu Anh Tú', 'Hà Nội', 'tubha@gmail.com', '2021-10-04', 'NULL', 'https://via.placeholder.com/400x200', 53602, '0988777733', '7c48c356be5105f24612e6d9db9dc584', 1, '2021-04-09 21:28:07', '2021-04-22 19:04:35', NULL, 'https://firebasestorage.googleapis.com/v0/b/qstore-99eb3.appspot.com/o/images%2Ffavicon.jpg?alt=media&token=cfa358aa-3809-401e-9667-0795fa6472f7', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wards`
--

CREATE TABLE `wards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gso_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branches_id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`);

--
-- Chỉ mục cho bảng `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `districts_province_id_foreign` (`province_id`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Chỉ mục cho bảng `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`menus_id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Chỉ mục cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`size_id`);

--
-- Chỉ mục cho bảng `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roles_id`);

--
-- Chỉ mục cho bảng `shipplace`
--
ALTER TABLE `shipplace`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wards_district_id_foreign` (`district_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `branches`
--
ALTER TABLE `branches`
  MODIFY `branches_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `districts`
--
ALTER TABLE `districts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `menus`
--
ALTER TABLE `menus`
  MODIFY `menus_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `size_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `roles_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `shipplace`
--
ALTER TABLE `shipplace`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `wards`
--
ALTER TABLE `wards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `wards`
--
ALTER TABLE `wards`
  ADD CONSTRAINT `wards_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
