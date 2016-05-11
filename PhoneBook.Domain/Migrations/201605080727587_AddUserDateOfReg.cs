namespace PhoneBook.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserDateOfReg : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "DayOfRegistration", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "DayOfRegistration");
        }
    }
}
