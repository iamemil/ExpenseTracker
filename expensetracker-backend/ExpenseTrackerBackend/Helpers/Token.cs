using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.IdentityModel.Tokens;
using ExpenseTrackerBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExpenseTrackerBackend.Helpers
{
    public class Token
    {
        private static string SECRET_KEY = "4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjW";
        private static HttpRequest request = HttpContext.Current.Request;
        private static string WEBSITE_URL = "https://emil-expensetracker.netlify.app/";
        public static string GetToken(User user)
        {
            byte[] secretKey = Encoding.UTF8.GetBytes(SECRET_KEY);
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(secretKey);
            SigningCredentials signingCredentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256Signature
            );
            ClaimsIdentity parameters = new ClaimsIdentity();
            parameters.AddClaim(new Claim(ClaimTypes.Email, user.EmailAddress));
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject = parameters,
                Expires = DateTime.UtcNow.AddMinutes(120),
                Issuer = WEBSITE_URL,
                SigningCredentials = signingCredentials
            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
            return handler.WriteToken(token);
        }

        private static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtToken = (JwtSecurityToken)handler.ReadJwtToken(token);
                if (jwtToken == null)
                {
                    return null;
                }
                byte[] secretKey = Encoding.UTF8.GetBytes(SECRET_KEY);
                SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(secretKey);
                TokenValidationParameters parameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = true,
                    ValidIssuer = WEBSITE_URL,
                    ValidateAudience = false,
                    IssuerSigningKey = symmetricSecurityKey
                };
                SecurityToken securityToken;
                ClaimsPrincipal principal = handler.ValidateToken(token, parameters, out securityToken);
                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public static string ValidateToken(string token)
        {
            ClaimsPrincipal principal = GetPrincipal(token);
            if (principal == null)
            {
                return null;
            }
            ClaimsIdentity identity = null;
            try
            {
                identity = (ClaimsIdentity)principal.Identity;
            }
            catch (NullReferenceException)
            {
                return null;
            }
            return identity.FindFirst(ClaimTypes.Email).Value;
        }
    }
}
